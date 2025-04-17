import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../service/firebase/conexao';
import { FORUNS_COLLECTION } from '../../model/refsCollection';
import Forum from '../../model/Forum';

// Criador de forum
async function forumCreate(forum) {
  // Verificação
  if (!(forum instanceof Forum)) {
    console.error('Parâmetro inválido');
    return false;
  }

  // Criação:
  try {
    return await addDoc(
      collection(db, FORUNS_COLLECTION),
      forum.toFirestoreData(),
    );
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default forumCreate;
