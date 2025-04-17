import { deleteDoc, doc } from 'firebase/firestore';
import { FORUNS_COLLECTION } from '../../model/refsCollection';
import { db } from '../../service/firebase/conexao';

async function forumDelete({ forumID }) {
  if (!forumID || typeof forumID !== 'string') {
    console.error('Tipo de ID inválido para Forum');
    return false;
  }

  try {
    const resp = await deleteDoc(doc(db, FORUNS_COLLECTION, forumID));
    console.log(resp);
    return resp;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default forumDelete;
