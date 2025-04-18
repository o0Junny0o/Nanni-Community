import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../service/firebase/conexao';
import Forum from '../../model/Forum';
import { FORUNS_COLLECTION } from '../../model/refsCollection';

async function forumQuery({ forumID }) {
  if (!forumID || typeof forumID !== 'string') {
    console.error('ID de Fórum inválido');
    return null;
  }

  try {
    const forumDoc = doc(db, FORUNS_COLLECTION, forumID);
    const snapshot = await getDoc(forumDoc);

    if (!snapshot.exists()) {
      throw new Error('Falha ao obter docs de Foruns');
    }

    return new Forum({ forumID: snapshot.id, ...snapshot.data() });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default forumQuery;
