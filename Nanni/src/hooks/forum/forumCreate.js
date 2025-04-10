import { addDoc, collection } from "firebase/firestore";
import { db } from "../../service/firebase/conexao";
import { FORUM_COLLECTION } from "../../app/models/refsCollection";
import Forum from "../../app/models/Forum";

// Criador de forum
async function forumCreate(forum) {
    // Verificação
    if(!(forum instanceof Forum)) {
        return null;
    }

    // Criação:
    try {
        const response = await addDoc(collection(db, FORUM_COLLECTION), forum.toFirestoreData())
        return response
    } catch(err) {
        console.error(err)
        return err
    }
}

export default forumCreate