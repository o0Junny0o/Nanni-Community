import { collection, limit, query } from 'firebase/firestore';
import { db } from '../service/firebase/conexao';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Discussao from '../model/Discussao';
import { DISCUSSAO_COLLECTION } from '../model/refsCollection';

// Hook para atualização dinâmica de lista de discussões em Forum
function useForumDiscussao({ forumPath, initialLimit }) {
  // Limite de busca:
  const [qLimit, setQLimit] = useState(initialLimit);
  // Lista de itens de Discussão:
  const [listDiscussao, setListDiscussao] = useState([]);
  // Adicionar mais ao limite:
  const addLimitDiscussao = async ({ addLimit }) => {
    if (!addLimit || typeof addLimit !== 'number') return;
    setQLimit(qLimit + addLimit);
  };

  // Query:
  const PATH = `${forumPath}/${DISCUSSAO_COLLECTION}`;
  const refForumDiscussao = collection(db, PATH);
  const queryForumDiscussao = query(refForumDiscussao, limit(qLimit));

  const [snapshot, loading, error] = useCollection(queryForumDiscussao);

  useEffect(() => {
    if (snapshot) {
      if (snapshot.empty) {
        setListDiscussao([]);
      } else {
        setListDiscussao(
          snapshot.docs.map(
            (doc) =>
              new Discussao({
                discussaoID: doc.id,
                forumPath: forumPath,
                ...doc.data(),
              }),
          ),
        );
      }
    }
  }, [snapshot]);

  return { listDiscussao, loading, error, addLimitDiscussao };
}

export default useForumDiscussao;
