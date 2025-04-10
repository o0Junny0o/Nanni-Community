import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../service/firebase/conexao";
import { FORUM_COLLECTION } from "../../app/models/refsCollection";
import Forum from "../../app/models/Forum";

async function forumUpdate(forum) {
    // Verificação
    if(!(forum instanceof Forum)) {
        console.error("Informações de Forum invalidas")
        return false;
    }

    try {
        const forumDoc = doc(db, FORUM_COLLECTION, forum.forumID);
        await updateDoc( forumDoc, forum.toFirestoreData());

        return true;
    } catch (error) {
        console.error(error)
        return false;
    }
}



export default forumUpdate;