import { serverTimestamp } from 'firebase/firestore';
import comentarioCreate from '../hooks/comentario/comentarioCreate';
import { COMENTARIOS_COLLECTION } from './refsCollection';
import { comentarioDelete } from '../hooks/comentario/comentarioDelete';
import comentarioReport from '../hooks/comentario/comentarioReport';

class Comentario {
  comentarioID;
  userRef;
  mensagem;
  data;
  anexo;
  //
  discussaoPath;

  constructor({ comentarioID, mensagem, userRef, data, anexo, discussaoPath }) {
    this.comentarioID = comentarioID;
    this.mensagem = mensagem;
    this.userRef = userRef;
    this.data = data ?? serverTimestamp();
    this.anexo = Array.isArray(anexo) ? anexo : [];
    //
    this.discussaoPath = discussaoPath;
  }

  getComentarioPath() {
    if (this.comentarioID && this.discussaoPath) {
      return `${this.discussaoPath}/${COMENTARIOS_COLLECTION}/${this.comentarioID}`;
    }

    return null;
  }

  async createDoc() {
    const resp = await comentarioCreate(this);

    if (resp.id) {
      this.comentarioID = resp.id;
      return true;
    }

    return false;
  }

  async deleteDoc() {
    return await comentarioDelete(this);
  }

  async reportComentario() {
    if (this.comentarioID && this.discussaoPath) {
      return await comentarioReport({
        discussaoPath: this.discussaoPath,
        comentarioID: this.comentarioID,
      });
    }

    return false;
  }

  toFirestoreData() {
    return {
      mensagem: this.mensagem.trim(),
      userRef: this.userRef,
      data: this.data,
      anexo: this.anexo,
    };
  }
}

export default Comentario;
