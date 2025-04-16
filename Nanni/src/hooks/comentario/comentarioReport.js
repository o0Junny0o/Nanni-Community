import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../service/firebase/conexao';

async function comentarioReport({ discussaoPath, comentarioID }) {
  if (typeof comentarioID !== 'string' || comentarioID.trim() == '') {
    console.error('ID de comentário deve ser válido');
    return false;
  }

  if (typeof discussaoPath !== 'string' || discussaoPath.trim() == '') {
    console.error('Caminho de discussão deve ser válido');
    return false;
  }

  try {
    const discussaoDoc = doc(db, discussaoPath);
    await updateDoc(discussaoDoc, {
      reportComentarios: arrayUnion(comentarioID),
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default comentarioReport;
