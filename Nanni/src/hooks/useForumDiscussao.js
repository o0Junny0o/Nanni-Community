import { collection, limit, query } from "firebase/firestore";
import { db } from "../service/firebase/conexao";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Discussao from "../app/models/Discussao";

// Hook para atualização dinâmica de lista de discussões em Forum
function useForumDiscussao({ forumPath, initialLimit }) {
    // Verificação:
    if(typeof forumPath  !== 'string' || forumPath.trim() == '') {
        return null;
    }

    
    // Tentativa:
    try {
        // Query:
        const refForumDiscussao = collection(db, forumPath);
        const queryForumDiscussao = query(refForumDiscussao, limit(qLimit))

        // Limite de busca:
        const [qLimit, setQLimit] = useState(initialLimit);
        // Lista de itens de Discussão:
        const [listDiscussao, setListDiscussao] = useState([])
        // Adicionar mais ao limite:
        const addLimitDiscussao = async ({ addLimit }) => {
            if(!addLimit || typeof addLimit !== 'number') return
            setQLimit(qLimit + addLimit)
        }

        const [snapshot, loading, error] = useCollection(queryForumDiscussao)

        useEffect(() => {
            if(snapshot) {
                setListDiscussao( 
                    snapshot.docs.map(doc => new Discussao({
                        discussaoID: doc.id, 
                        forumPath: forumPath, 
                        ...doc.data()
                    })) 
                )
            }
        }, [snapshot])

        return { listDiscussao, loading, error, addLimitDiscussao };
    } catch (error) {
        return null;
    }
}

export default useForumDiscussao