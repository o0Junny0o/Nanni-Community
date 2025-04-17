import { serverTimestamp } from 'firebase/firestore';
import discussaoCreate from '../hooks/discussao/discussaoCreate';
import { DISCUSSAO_COLLECTION } from './refsCollection';
import TagNormalize from '../utils/TagNormalize';

class Discussao {
  discussaoID;
  titulo;
  tag;
  mensagem;
  data;
  //
  forumPath;

  constructor({ discussaoID, titulo, tag, mensagem, data, forumPath }) {
    this.discussaoID = discussaoID;
    this.titulo = titulo;
    this.tag = tag ?? '';
    this.mensagem = mensagem ?? '';
    this.data = data ?? serverTimestamp();
    this.forumPath = forumPath;
  }

  getDiscussaoPath() {
    if (this.discussaoID && this.forumPath) {
      return `${this.forumPath}/${DISCUSSAO_COLLECTION}/${this.discussaoID}`;
    }

    return null;
  }

  async create() {
    const resp = await discussaoCreate(this);
    if (resp.id) {
      this.discussaoID = resp.id;
      return true;
    }

    return false;
  }

  async update() {}

  async delete() {}

  toFirestoreData() {
    // Transforma TAG
    const retTag = (typeof this.tag === 'string') ?
      TagNormalize(this.tag)
      : '';


    return {
      titulo: this.titulo,
      tag: retTag,
      mensagem: this.mensagem,
      data: this.data,
    };
  }
}

export default Discussao;
