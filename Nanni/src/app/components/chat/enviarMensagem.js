import PropTypes from 'prop-types';
import Comentario from '../../../model/Comentario';

export default async function enviarMensagem({
  text,
  userRef,
  anexos,
  discussaoPath,
}) {
  if (text.length < 2) return;

  try {
    const comentario = new Comentario({
      mensagem: text,
      userRef: userRef,
      anexo: anexos,
      discussaoPath: discussaoPath,
    });

    const resp = await comentario.create();

    if (resp) {
      return true;
    } else {
      return;
    }
  } catch (err) {
    console.error(err);
    return;
  }
}

enviarMensagem.propTypes = {
  text: PropTypes.string.isRequired,
  userRef: PropTypes.string.isRequired,
  anexos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired,
    }),
  ).isRequired,
  discussaoPath: PropTypes.string.isRequired,
};
