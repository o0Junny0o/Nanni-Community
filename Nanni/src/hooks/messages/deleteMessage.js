import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../service/firebase/Conexao"


export async function deleteMessage({ discussaoPATH, msgID }) {
    // Tratamento:
    if(!msgID || typeof msgID !== 'string') return
    
    // Collection:
    const MESSAGE_PATH = `${discussaoPATH}/Comentários` 


    try {
        const deleteMsgRef = doc(db, MESSAGE_PATH, msgID)
        await deleteDoc(deleteMsgRef)

        return true
    } catch(err) {
        return false
    }
}