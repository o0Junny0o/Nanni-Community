import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../service/firebase/conexao';
import Discussao from '../../model/Discussao';
import { DISCUSSAO_COLLECTION } from '../../model/refsCollection';

async function discussaoCreate(discussao) {
  if (!(discussao instanceof Discussao)) {
    return null;
  }

  try {
    const path = `${discussao.forumPath}/${DISCUSSAO_COLLECTION}`;
    const response = await addDoc(
      collection(db, path),
      discussao.toFirestoreData(),
    );

    return response;
  } catch (error) {
    return error;
  }
}

export default discussaoCreate;
