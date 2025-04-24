import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, limit, query } from 'firebase/firestore';
import { db } from '../service/firebase/conexao';
import { COMENTARIOS_COLLECTION } from '../model/refsCollection';
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
  const MESSAGE_QUERY = query(MESSAGE_REFERENCE, limit(qLimit));

  // Hook var.:
  const [snapshotMessages, loadingMessages, errorMessages] =
    useCollection(MESSAGE_QUERY);
  const [messages, setMessages] = useState([]);

  // Atualização do [map]:
  useEffect(() => {
    if (snapshotMessages) {
      setMessages(
        snapshotMessages.docs.map(
          (doc) =>
            new Comentario({
              comentarioID: doc.id,
              discussaoPath: discussaoPATH,
              ...doc.data(),
            }),
        ),
      );
    }
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