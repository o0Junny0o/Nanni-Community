import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from './conexao';
import {
  USUARIOS_COLLECTION,
  VENDAS_COLLECTION,
} from '../../model/refsCollection';
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

async function getJogosDoUsuario(userId) {
  try {
    const userDocRef = doc(db, USUARIOS_COLLECTION, userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) return [];

    // Extrair caminhos completos das referências
    const jogosRefs = userDoc.data().jogos || [];
    
    return jogosRefs.length > 1 ?
      jogosRefs.map((ref) => `/${ref.path}`)
      : Array(jogosRefs[0])
  } catch (error) {
    console.error('Erro ao buscar jogos do usuário:', error);
    return [];
  }
}

// Função principal
export async function calcularVendasPorJogo(userId) {
  try {
    const jogosRefs = await getJogosDoUsuario(userId);
<<<<<<< Updated upstream:Nanni/src/service/firebase/vendasService.js

=======
    // console.log('REFS:',jogosRefs)
>>>>>>> Stashed changes:Nanni/src/service/firebase/analytics/vendasService.js
    if (jogosRefs.length === 0) return {};
    
    const vendasRef = collection(db, VENDAS_COLLECTION);
    const chunks = [];
    const CHUNK_SIZE = 10;
<<<<<<< Updated upstream:Nanni/src/service/firebase/vendasService.js

=======
    // console.log('VENDAS REF',vendasRef)
>>>>>>> Stashed changes:Nanni/src/service/firebase/analytics/vendasService.js
    for (let i = 0; i < jogosRefs.length; i += CHUNK_SIZE) {
      const chunk = jogosRefs.slice(i, i + CHUNK_SIZE);
      const q = query(vendasRef, where('itensComprados', 'in', chunk));
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
      const data = new Date(venda.data);
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
    console.error('Erro ao calcular vendas:', error);
    return {};
  }
}
