import { deleteDoc, doc } from "firebase/firestore";
import { FORUM_COLLECTION } from "../../app/models/refsCollection";
import { db } from "../../service/firebase/conexao";

async function forumDelete({ forumID }) {
    if(!forumID || typeof forumID !== 'string') {
        console.error("Tipo de ID inválido para Forum")
        return false;
    }

    try {
        const resp = await deleteDoc(doc(db, FORUM_COLLECTION, forumID))
        console.log(resp)
        return resp;
    } catch (error) {
        console.error(error)
        return false;
    }
}



export default forumDelete;