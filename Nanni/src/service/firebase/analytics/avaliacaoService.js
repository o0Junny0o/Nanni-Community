import { db } from '../conexao';
import { getDocs, collection, doc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import { AVALIACOES_COLLECTION } from '../../../model/refsCollection';

export async function getAvaAvg(jogosRefs) {
  try {
    if (!Array.isArray(jogosRefs) || jogosRefs.length === 0) return {};

    // Processar avaliações em paralelo
    const promises = jogosRefs.map(async (jogo) => {
      try {
        const caminho = jogo.caminho;
        const avaliacoesCol = collection(
          doc(db, caminho),
          AVALIACOES_COLLECTION,
        );
        const snap = await getDocs(avaliacoesCol);

        const avaliacoes = snap.docs
          .map((d) => d.data().avaliacao)
          .filter(Number.isFinite);

        return {
          caminho,
          media: calcularMedia(avaliacoes),
        };
      } catch (error) {
        console.error(`Erro no jogo ${jogo.caminho}:`, error);
        return {
          caminho: jogo.caminho,
          media: 0,
        };
      }
    });

    const resultados = await Promise.all(promises);

    // Converter para objeto
    return resultados.reduce((acc, { caminho, media }) => {
      acc[caminho] = media;
      return acc;
    }, {});
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: error.message || 'Erro ao calcular médias',
    });
    console.error('Erro geral:', error);
    return {};
  }
}

function calcularMedia(avaliacoes) {
  if (!avaliacoes.length) return 0;
  const soma = avaliacoes.reduce((a, b) => a + b, 0);
  return Math.round((soma / avaliacoes.length) * 10) / 10;
}
