import { addDoc, collection } from "firebase/firestore";
import { db } from "../../service/firebase/conexao";
import { FORUM_COLLECTION } from "../../app/models/refsCollection";
import Forum from "../../app/models/Forum";

// Criador de forum
async function forumCreate(forum) {
    // Verificação
    if(!(forum instanceof Forum)) {
        console.error("Parâmetro inválido")
        return false;
    }

    // Criação:
    try {
        return await addDoc(collection(db, FORUM_COLLECTION), forum.toFirestoreData())
    } catch(err) {
        console.error(err)
        return false
    }
}

export default forumCreate