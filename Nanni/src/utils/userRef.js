import { doc } from 'firebase/firestore';
import { db } from '../service/firebase/conexao';
import { USUARIOS_COLLECTION } from '../model/refsCollection';

export function userRef(userID) {
  const userRef = doc(db, USUARIOS_COLLECTION, userID);

  return userRef;
}
