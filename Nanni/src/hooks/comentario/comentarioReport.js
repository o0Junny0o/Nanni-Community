import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../service/firebase/conexao';
import PropTypes from 'prop-types';

export default async function comentarioReport({ discussaoPath, comentarioID }) {
  if (comentarioID.trim() == '') {
    console.error('ID de comentário deve ser válido');
    return false;
  }

  if (discussaoPath.trim() == '') {
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


comentarioReport.propTypes = {
  discussaoPath: PropTypes.string.isRequired,
  comentarioID: PropTypes.string.isRequired,
}
