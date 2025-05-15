import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../conexao';
import {
  USUARIOS_COLLECTION,
  VENDAS_COLLECTION,
} from '../../../model/refsCollection';
import Toast from 'react-native-toast-message';

const MESES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export async function getJogosDoUsuario(userId) {
  try {
    const userDocRef = doc(db, USUARIOS_COLLECTION, userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) return [];

    // Extrair caminhos completos das referências
    const jogosRefs = userDoc.data().jogos || [];
    return jogosRefs.map((ref) => `/${ref.path}`);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: error,
    });
    console.error('Erro ao buscar jogos do usuário:', error);
    return [];
  }
}

export async function calcularVendasPorJogo(userId, ano) {
  const anoNumerico = Number(ano);
  const anoInicio = Timestamp.fromDate(new Date(anoNumerico, 0, 1));
  const anoFim = Timestamp.fromDate(new Date(anoNumerico + 1, 0, 1));
  try {
    const jogosRefs = await getJogosDoUsuario(userId);
    console.log('REFS:',jogosRefs)
    if (jogosRefs.length === 0) return {};

    const vendasRef = collection(db, VENDAS_COLLECTION);
    const chunks = [];
    const CHUNK_SIZE = 10;
    console.log('VENDAS REF',vendasRef)
    for (let i = 0; i < jogosRefs.length; i += CHUNK_SIZE) {
      const chunk = jogosRefs.slice(i, i + CHUNK_SIZE);
      const q = query(
        vendasRef,
        where('itensComprados', 'in', chunk),
        where('data', '>=', anoInicio),
        where('data', '<', anoFim),
      );
      chunks.push(getDocs(q));
    }

    const snapshots = await Promise.all(chunks);

    const vendasSnapshot = snapshots.flatMap((s) => s.docs);

    // 2. Processar apenas vendas filtradas
    const jogos = {};

    vendasSnapshot.forEach((doc) => {
      const venda = doc.data();
      const caminhoJogo = venda.itensComprados; // Ex: "/jogos/x8w7v6u5t4s3r2q1p0o9n8m7"
      const idJogo = caminhoJogo.split('/').pop(); // Extrai o ID

      // Extrair mês
      const data = venda.data.toDate();
      const mes = MESES[data.getUTCMonth()];

      // Inicializar estrutura se necessário
      if (!jogos[idJogo]) {
        jogos[idJogo] = Object.fromEntries(MESES.map((m) => [m, 0])); // Inicializa todos os meses com 0
      }

      // Somar valor
      jogos[idJogo][mes] += venda.valorTotal;
    });

    // 3. Converter para formato de array
    const resultado = {};
    for (const [idJogo, meses] of Object.entries(jogos)) {
      resultado[idJogo] = MESES.map((name) => ({
        name,
        value: meses[name],
      }));
    }

    // Converter para array no final
    return Object.entries(resultado).map(([id, meses]) => ({
      id,
      data: meses, // Já está no formato [{name: 'Jan', value: X}, ...]
    }));
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: error,
    });
    console.error('Erro ao calcular vendas:', error);
    return {};
  }
}

export async function getNumVendas(userId) {
  try {
    const jogosRefs = await getJogosDoUsuario(userId);

    if (jogosRefs.length === 0) return {};

    const vendasRef = collection(db, VENDAS_COLLECTION);
    const chunks = [];
    const CHUNK_SIZE = 10;

    // Dividir jogosRefs em chunks de 10 para a consulta 'in'
    for (let i = 0; i < jogosRefs.length; i += CHUNK_SIZE) {
      const chunk = jogosRefs.slice(i, i + CHUNK_SIZE);
      const q = query(vendasRef, where('itensComprados', 'in', chunk));
      chunks.push(getDocs(q));
    }

    // Executar todas as consultas em paralelo
    const snapshots = await Promise.all(chunks);
    const vendasSnapshot = snapshots.flatMap((s) => s.docs);

    // Contar vendas por jogo
    const contagemJogos = {};

    vendasSnapshot.forEach((doc) => {
      const venda = doc.data();
      const caminhoJogo = venda.itensComprados;
      const idJogo = caminhoJogo.split('/').pop(); // Extrai o ID do jogo

      if (!contagemJogos[idJogo]) {
        contagemJogos[idJogo] = 0;
      }
      contagemJogos[idJogo] += 1;
    });

    return contagemJogos;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: error,
    });
    console.error('Erro ao somar vendas:', error);

    return {};
  }
}
