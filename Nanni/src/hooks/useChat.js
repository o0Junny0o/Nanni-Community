import { useEffect, useRef, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  collection,
  doc,
  getDoc,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../service/firebase/conexao';
import {
  COMENTARIOS_COLLECTION,
  USUARIOS_COLLECTION,
} from '../model/refsCollection';
import Comentario from '../model/Comentario';

// Retorna [map] de mensagens com atualização em tempo real
function useChat({ discussaoPATH, initialLimit }) {
  // Tratamento:
  if (!discussaoPATH || typeof discussaoPATH !== 'string') {
    console.error('Discussão inválida');
    return null;
  }
  if (!initialLimit || typeof initialLimit !== 'number') {
    console.error('Sem limite inicial');
    return null;
  }

  // Limit var.:
  const [qLimit, setQLimit] = useState(initialLimit);
  // Query:
  const MESSAGE_PATH = `${discussaoPATH}/${COMENTARIOS_COLLECTION}`;
  const MESSAGE_REFERENCE = collection(db, MESSAGE_PATH);
  const MESSAGE_QUERY = query(
    MESSAGE_REFERENCE,
    limit(qLimit),
    orderBy('data'),
  );
  // Users:
  const [users, setUsers] = useState([]);

  // Hook var.:
  const [snapshotMessages, loadingMessages, errorMessages] =
    useCollection(MESSAGE_QUERY);
  const [messages, setMessages] = useState([]);

  // Atualização do [map]:
  useEffect(() => {
    if (!snapshotMessages) return;

    async function atualizar() {
      const msgs = [];
      const msgUsers = [...users];
      const ksUsers = Object.keys(users);

      for (const msgDoc of snapshotMessages.docs) {
        const com = new Comentario({
          comentarioID: msgDoc.id,
          discussaoPath: discussaoPATH,
          ...msgDoc.data(),
        });

        const userRef = com.userRef;

        if (!ksUsers.includes(userRef)) {
          const ref = doc(db, USUARIOS_COLLECTION, userRef);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            msgUsers.push({
              userRef,
              nome: snap.data().nome,
            });
          } else {
            msgUsers.push({ userRef });
          }
        }

        msgs.push({
          username: msgUsers.find((u) => u.userRef === userRef)?.nome || '',
          comentario: com,
        });
      }

      setMessages(msgs);
      setUsers(msgUsers);
    }

    atualizar();
  }, [snapshotMessages]);

  const addMessages = ({ addLimit }) => {
    if (!addLimit || typeof addLimit !== 'number') return null;
    setQLimit(qLimit + addLimit);
  };

  // Retorno do [map de Mensagens], [verificação da conexão], [erro do Firestore]
  return {
    data: messages,
    loading: loadingMessages,
    error: errorMessages,
    addToLimit: [addMessages],
  };
}

export default useChat;
