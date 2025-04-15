import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../service/firebase/Conexao';
import { FORUNS_COLLECTION } from '../../model/refsCollection';
import Forum from '../../model/Forum';

async function forumUpdate(forum) {
  // Verificação
  if (!(forum instanceof Forum)) {
    console.error('Informações de Forum invalidas');
    return false;
  }

  try {
    const forumDoc = doc(db, FORUNS_COLLECTION, forum.forumID);
    await updateDoc(forumDoc, forum.toFirestoreData());

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default forumUpdate;
