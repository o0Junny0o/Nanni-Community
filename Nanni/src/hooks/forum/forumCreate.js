import { addDoc, collection } from "firebase/firestore";
import { Forum, FORUM_COLLECTION } from "../../app/models/Forum"
import { db } from "../../service/firebase/Conexao";

// Criador de forum
async function forumCreate(forum) {
    // Verificação
    if(!(forum instanceof Forum)) {
        return null;
    }

    // Criação:
    try {
        await addDoc(collection(db, FORUM_COLLECTION), forum.toFirestoreData())
        return true
    } catch(err) {
        return err
    }
}

export default forumCreate