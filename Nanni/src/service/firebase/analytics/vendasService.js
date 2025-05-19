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

    // Extrair referências dos jogos
    const jogosRefs = userDoc.data().jogos || [];

    // Obter os nomes dos jogos e seus respectivos caminhos
    const jogosComNomes = await Promise.all(
      jogosRefs.map(async (ref) => {
        const jogoDoc = await getDoc(ref);
        if (jogoDoc.exists()) {
          const nomeJogo = jogoDoc.data().nome || 'Nome não disponível'; // Se o nome do jogo estiver no documento
          const caminho = `/${ref.path}`;
          return { nome: nomeJogo, caminho: caminho };
        } else {
          return null; // Caso o jogo não exista
        }
      })
    );

    // Filtra os jogos que existem e retorna a lista
    return jogosComNomes.filter(jogo => jogo !== null);
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

export async function getDataJogosVenda(jogosRefs) {
  try {
    if (jogosRefs.length === 0) return [];

    const vendasRef = collection(db, VENDAS_COLLECTION);
    const caminhos = jogosRefs.map(jogo => jogo.caminho);

    // Criar mapa para armazenar anos por jogo
    const jogosMap = new Map(
      jogosRefs.map(jogo => [
        jogo.caminho, 
        { nome: jogo.nome, anos: new Set() }
      ])
    );

    // Corrigindo o chunking de caminhos
    const CHUNK_SIZE = 10;
    const promises = [];
    
    for (let i = 0; i < caminhos.length; i += CHUNK_SIZE) {
      const chunk = caminhos.slice(i, i + CHUNK_SIZE);
      const q = query(
        vendasRef,
        // Se o campo itensComprados for um array (múltiplos itens por compra), altere o operador para:
        // where('itensComprados', 'array-contains-any', chunk)
        where('itensComprados', 'in', chunk)
      );
      promises.push(getDocs(q));
    }

    // Executando todas as queries em paralelo
    const snapshots = await Promise.all(promises);

    // Processando todos os resultados
    snapshots.forEach(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = doc.data();
        const itens = Array.isArray(data.itensComprados) 
                     ? data.itensComprados 
                     : [data.itensComprados];
        
        const date = data.data?.toDate?.() || new Date(data.data);
        if (isNaN(date.getTime())) return;

        const year = date.getFullYear();
        
        // Adicionar ano aos jogos correspondentes
        itens.forEach(item => {
          if (jogosMap.has(item)) {
            jogosMap.get(item).anos.add(year);
          }
        });
      });
    });

    // Converter para objeto de resposta
    const result = {};
    jogosMap.forEach((value, key) => {
      result[key] = {
        nome: value.nome,
        anos: Array.from(value.anos).sort((a, b) => b - a)
      };
    });

    return result;

  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: error.message || 'Erro ao buscar vendas',
    });
    console.error('Erro ao calcular vendas:', error);
    return [];
  }
}

export async function calcularVendasPorJogo(jogosRefs, ano) {
  // Validar ano
  const anoNumerico = parseInt(ano, 10);
  if (isNaN(anoNumerico)) {
    Toast.show({
      type: 'error',
      text1: 'Ano inválido',
      text2: `Informe um ano valido. Você passou: "${ano}".`,
    });
    return [];
  }

  // Criar timestamps com segurança
  let anoInicio, anoFim;
  try {
    anoInicio = Timestamp.fromDate(new Date(anoNumerico, 0, 1));
    anoFim    = Timestamp.fromDate(new Date(anoNumerico + 1, 0, 1));
  } catch (e) {
    console.error('Erro ao criar datas:', e);
    Toast.show({
      type: 'error',
      text1: 'Erro de data',
      text2: 'Falha ao calcular intervalo para o ano informado.',
    });
    return [];
  }
  try {
    if (jogosRefs.length === 0) return {};
    
    const vendasRef = collection(db, VENDAS_COLLECTION);
    const caminhos = jogosRefs.map(jogo => jogo.caminho);

    const chunks = [];
    const CHUNK_SIZE = 10;

    for (let i = 0; i < caminhos.length; i += CHUNK_SIZE) {
      const chunk = caminhos.slice(i, i + CHUNK_SIZE);
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

      // Extrair mês
      const data = venda.data.toDate();
      const mes = MESES[data.getUTCMonth()];

      // Inicializar estrutura se necessário
      if (!jogos[caminhoJogo]) {
        jogos[caminhoJogo] = Object.fromEntries(MESES.map((m) => [m, 0])); // Inicializa todos os meses com 0
      }

      // Somar valor
      jogos[caminhoJogo][mes] += venda.valorTotal;
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

export async function getNumVendas(jogosRefs) {
  try {
    if (jogosRefs.length === 0) return {};

    const vendasRef = collection(db, VENDAS_COLLECTION);
    const caminhos = jogosRefs.map(jogo => jogo.caminho);

    const chunks = [];
    const CHUNK_SIZE = 10;

    // Dividir jogosRefs em chunks de 10 para a consulta 'in'
    for (let i = 0; i < caminhos.length; i += CHUNK_SIZE) {
      const chunk = caminhos.slice(i, i + CHUNK_SIZE);
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

      if (!contagemJogos[caminhoJogo]) {
        contagemJogos[caminhoJogo] = 0;
      }
      contagemJogos[caminhoJogo] += 1;
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
