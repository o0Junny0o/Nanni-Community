import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '../service/firebase/Conexao';


// Retorna [map] de mensagens com atualização em tempo real
export function useChat({ discussaoPATH }) {
    // Tratamento:
    if(!discussaoPATH || typeof discussaoPATH !== 'string') return

    // Query:
    const MESSAGE_PATH = `${discussaoPATH}/Comentários` 
    const MESSAGE_REFERENCE = collection(db, MESSAGE_PATH)
    const MESSAGE_QUERY = query(MESSAGE_REFERENCE, orderBy('date'))   

    // Hook var.:
    const [snapshotMessages, loadingMessages, errorMessages] = useCollection(MESSAGE_QUERY)
    const [messages, setMessages] = useState([])

    // Atualização do [map]:
    useEffect(() => {
        if(snapshotMessages) {
            setMessages(snapshotMessages.docs.map((msg) => ({
                id: msg.id,
                ...msg.data()
            })))
        }
    }, [snapshotMessages]) 

    // Retorno do [map de Mensagens], [verificação da conexão], [erro do Firestore]
    return { messages, loadingMessages, errorMessages }
}