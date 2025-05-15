import { getJogosDoUsuario } from './vendasService';
import { db } from '../conexao';
import { getDocs, collection, doc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import { AVALIACOES_COLLECTION } from '../../../model/refsCollection';

export async function getAvaAvg(userId) {
  try {
    const jogosRefs = await getJogosDoUsuario(userId);

    const mediasPorJogo = {};

    // Para cada referência de jogo
    for (const jogoPath of jogosRefs) {
      // Obtem o documento da referência (caso seja uma string como "/jogos/id")
      const jogoRef = doc(db, jogoPath);
      const avaliacoesCol = collection(jogoRef, AVALIACOES_COLLECTION);

      const snap = await getDocs(avaliacoesCol);
      const avaliacoes = [];

      snap.forEach((doc) => {
        const data = doc.data();
        if (data.avaliacao !== undefined) {
          avaliacoes.push(data.avaliacao);
        }
      });

      mediasPorJogo[jogoPath] = calcularMedia(avaliacoes);
    }

    return mediasPorJogo;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: error,
    });
  }
}

function calcularMedia(avaliacoes) {
  const notasValidas = avaliacoes.filter(
    (val) => typeof val === 'number' && !isNaN(val),
  );
  if (notasValidas.length === 0) return 0;
  const soma = notasValidas.reduce((acc, val) => acc + val, 0);
  const media = soma / notasValidas.length;
  return Math.round(media * 10) / 10; // ex: 8.66 → 8.7
}
