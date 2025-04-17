import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../service/firebase/conexao';
import { FORUNS_COLLECTION } from '../../model/refsCollection';
import Forum from '../../model/Forum';

async function forumList({ qLimit }) {
  try {
    // Query dinâmica:
    const queryArgs = [
      qLimit || qLimit > 0 ? limit(qLimit) : null,
    ].filter(Boolean);

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