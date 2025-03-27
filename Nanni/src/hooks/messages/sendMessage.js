import { addDoc, serverTimestamp, collection } from "firebase/firestore"
import { db } from "../../service/firebase/Conexao"


// Envia mensagem a coleção Message
export async function sendMessage({ discussaoPATH, userRef, message, anexo }) {
    // Tratamento:
    if(typeof message !== 'string' && message.trim() !== '') return
    if(!userRef) return
    
    // Collection:
    const MESSAGE_PATH = `${discussaoPATH}/Comentários` 
    const MESSAGE_REFERENCE = collection(db, MESSAGE_PATH)


    // Envio:
    try {
        await addDoc(MESSAGE_REFERENCE, {
            userRef: userRef,
            mensagem: message,
            data: serverTimestamp(),            
            anexo: Array.isArray(anexo) ? anexo : [anexo]
        })    
        
        return true
    } catch(err) {
        console.log(`function sendMessage ERROR : ${err}`)
        return false
    }
}