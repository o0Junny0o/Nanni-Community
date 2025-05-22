import {
  collection,
  documentId,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../service/firebase/conexao';
import { FORUNS_COLLECTION } from '../../model/refsCollection';
import Forum from '../../model/Forum';

async function forumList({
  qLimit,
  qIDs,
  qUserRef,
  qTags,
  qIndicativa,
  qOrderBy,
}) {
  try {
    // Query dinâmica:
    const queryArgs = [];

    if (qLimit && qLimit > 0) {
      queryArgs.push(qLimit);
    }
    if (qIDs && qIDs.length > 0) {
      if (!Array.isArray(qIDs)) {
        qIDs = Array(qIDs);
      }

      qIDs = qIDs.map((item) => String(item));

      queryArgs.push(where(documentId(), 'in', qIDs));
    }
    if (qUserRef && typeof qUserRef === 'string') {
      queryArgs.push(where('userRef', '==', qUserRef));
    }
    if (qTags && qTags.length > 0) {
      if (!Array.isArray(qTags)) {
        qTags = Array(qTags);
      }

      qTags = qTags.map((item) => String(item));
      queryArgs.push(where('tagsDisponiveis', 'array-contains-any', qTags));
    }
    if (qIndicativa) {
      if (!Array.isArray(qIndicativa)) {
        qIndicativa = Array(qIndicativa);
      }

      queryArgs.push(where('classificacaoIndicativa', 'in', qIndicativa));
    }
    if (typeof qOrderBy !== 'undefined') {
      queryArgs.push(orderBy('data', qOrderBy ? 'desc' : 'asc'));
    }

    //

    // Query:
    const forumDoc = collection(db, FORUNS_COLLECTION);
    const forumQuery = query(forumDoc, ...queryArgs);
    const snapshot = await getDocs(forumQuery);

    if (!snapshot) {
      throw new Error('Falha ao obter docs de Foruns');
    }

    return snapshot.docs.map(
      (doc) =>
        new Forum({
          forumID: doc.id,
          ...doc.data(),
        }),
    );
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default forumList;
