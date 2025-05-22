import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../service/firebase/conexao';
import { COMENTARIOS_COLLECTION } from '../../model/refsCollection';
import Comentario from '../../model/Comentario';

// Envia mensagem a coleção Message
async function comentarioCreate(comentario) {
  // Tratamento:
  if (!(comentario instanceof Comentario)) return null;
  console.log(comentario.anexo)
  if (comentario.anexo.length == 0) {
    if (
      typeof comentario.mensagem !== 'string' ||
      comentario.mensagem.trim() === ''
    ) {
      return null;
    }
  }

  // Envio:
  try {
    // Collection:
    const MESSAGE_PATH = `${comentario.discussaoPath}/${COMENTARIOS_COLLECTION}`;
    const MESSAGE_REFERENCE = collection(db, MESSAGE_PATH);

    return await addDoc(MESSAGE_REFERENCE, comentario.toFirestoreData());
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default comentarioCreate;
