import { collection, documentId, FieldPath, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../service/firebase/conexao';
import { FORUNS_COLLECTION } from '../../model/refsCollection';
import Forum from '../../model/Forum';

async function forumList({ qLimit, qIDs }) {
  try {
    // Query dinâmica:
    const queryArgs = []

    if(qLimit && qLimit > 0) {
      queryArgs.push(qLimit)
    }
    if(qIDs && qIDs.length > 0) {
      if(!Array.isArray(qIDs)) {
        qIDs = Array(qIDs)
      } 

      qIDs = qIDs.map(item => String(item))

      queryArgs.push(where(documentId(), 'in', qIDs))
    }

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