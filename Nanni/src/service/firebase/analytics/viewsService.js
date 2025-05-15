import { db } from '../conexao';
import { getJogosDoUsuario } from './vendasService';
import { doc, getDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

export async function getViews(userId) {
  try {
    const jogosRefs = await getJogosDoUsuario(userId);

    if (jogosRefs.length === 0) return {};

    // Converter caminhos completos em referências de documentos
    const jogosDocs = jogosRefs.map((jogoPath) => {
      const pathParts = jogoPath.split('/').filter((p) => p !== ''); // Remove strings vazias
      return doc(db, ...pathParts); // Cria a referência do documento
    });

    // Buscar todos os documentos dos jogos de uma vez
    const snapshots = await Promise.all(
      jogosDocs.map((docRef) => getDoc(docRef)),
    );

    // Extrair numViews de cada documento
    const viewsPorJogo = {};
    snapshots.forEach((snapshot, index) => {
      const jogoId = jogosDocs[index].id; // ID do documento
      const data = snapshot.data();
      viewsPorJogo[jogoId] = data?.numViews || 0; // Usa 0 se não existir
    });

    return viewsPorJogo;
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
