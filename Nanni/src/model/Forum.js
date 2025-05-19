import { serverTimestamp } from 'firebase/firestore';
import forumCreate from '../hooks/forum/forumCreate';
import forumDelete from '../hooks/forum/forumDelete';
import forumUpdate from '../hooks/forum/forumUpdate';
import { FORUNS_COLLECTION } from './refsCollection';

// Model de Forum
class Forum {
  constructor({
    forumID,
    avatar,
    userRef,
    forumName,
    forumDesc,
    data,
    classificacaoIndicativa,
    tagsDisponiveis,
    reportComentarios,
  }) {
    this.forumID = forumID;
    this.avatar = avatar;
    this.userRef = userRef;
    this.forumName = forumName;
    this.forumDesc = forumDesc;
    this.data = data;
    this.classificacaoIndicativa = classificacaoIndicativa;
    this.tagsDisponiveis = tagsDisponiveis ?? [];
    this.reportComentarios = reportComentarios ?? [];
  }

  getForumPath() {
    if (this.forumID) {
      return `${FORUNS_COLLECTION}/${this.forumID}`;
    }

    return null;
  }

  async create() {
    const resp = await forumCreate(this);

    if (resp.id) {
      this.forumID = resp.id;
      return true;
    }

    return false;
  }

  async delete() {
    if (this.forumID) {
      return await forumDelete(this);
    }

    return false;
  }

  async update() {
    if (this.forumID) {
      return await forumUpdate(this);
    }

    return false;
  }

  setAvatar(avatar) { 
    this.avatar = avatar
  }

  setID(forumID) {
    this.forumID = forumID;
  }

  static get classificacaoIndicativa() { 
    return ['+18', '+16', '+14']
  };

  toFirestoreData() {
    return {
      userRef: this.userRef,
      avatar: this.avatar ?? '',
      data: this.data ?? serverTimestamp(),
      forumName: this.forumName,
      forumDesc: this.forumDesc,
      classificacaoIndicativa: this.classificacaoIndicativa,
      tagsDisponiveis: this.tagsDisponiveis,
      reportComentarios: this.reportComentarios,
    };
  }
}

export default Forum;
