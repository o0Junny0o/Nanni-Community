import { deleteDoc, doc } from 'firebase/firestore';
import { FORUNS_COLLECTION } from '../../model/refsCollection';
import { db } from '../../service/firebase/conexao';

async function forumDelete({ forumID }) {
  if (!forumID || typeof forumID !== 'string') {
    console.error('Tipo de ID inválido para Forum');
    return null;
  }

  try {
    await deleteDoc(doc(db, FORUNS_COLLECTION, forumID));
    return true;
  } catch (error) {
    return error;
  }
}

export default forumDelete;
