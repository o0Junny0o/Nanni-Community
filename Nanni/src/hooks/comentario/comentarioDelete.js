import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../service/firebase/conexao"
import { COMENTARIOS_COLLECTION } from "../../app/models/refsCollection"


export async function comentarioDelete({ discussaoPath, comentarioID }) {
    // Verificação:
    if(!comentarioID || typeof comentarioID !== 'string') {
        console.error("ID de comentário inválido")
        return null;
    }    
    

    try {
        const path = `${discussaoPath}/${COMENTARIOS_COLLECTION}` 
        return await deleteDoc(doc(db, path, comentarioID))
    } catch(err) {
        console.error(err)
        return false
    }
}