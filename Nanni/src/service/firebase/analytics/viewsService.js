import { db } from '../conexao';
import { doc, getDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

export async function getViews(jogosRefs) {
  try {
    if (jogosRefs.length === 0 || !Array.isArray(jogosRefs)) return {};

    const viewsPorJogo = {};
      await Promise.all(
        jogosRefs.map(async (jogo) => {
          try {
            // Verificar e extrair o caminho corretamente
            const caminho = jogo?.caminho || jogo?.path;
            if (!caminho) {
              console.warn('Item inválido:', jogo);
              return;
            }

            const pathParts = caminho.split('/').filter(p => p);
            const docRef = doc(db, ...pathParts);
            const snapshot = await getDoc(docRef);

            viewsPorJogo[caminho] = snapshot.data()?.numViews || 0;
          } catch (error) {
            console.error('Erro no documento', jogo, error);
          }
        })
      );

      return viewsPorJogo;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: typeof error === 'object' 
         ? error.message || 'Erro desconhecido' 
         : String(error),
    });
    console.error('Erro ao somar vendas:', error);

    return {};
  }
}
