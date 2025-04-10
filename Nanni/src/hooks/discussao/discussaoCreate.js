import { addDoc, collection } from "firebase/firestore";
import { db } from "../../service/firebase/conexao";
import Discussao from "../../app/models/Discussao";
import { DISCUSSAO_COLLECTION } from "../../app/models/refsCollection";



async function discussaoCreate(discussao) {
    if(!(discussao instanceof Discussao)) {
        console.error("Tipo de instância errada")
        return false;
    }
    
    
    try {
        const path = `${discussao.forumPath}/${DISCUSSAO_COLLECTION}`
        const response = await addDoc(collection(db, path), discussao.toFirestoreData())        

        return response
    } catch (error) {
        console.error(error)
        return false;
    }
}



export default discussaoCreate;