import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../service/firebase/conexao";
import { FORUM_COLLECTION } from "../../app/models/refsCollection";
import Forum from "../../app/models/Forum";

async function forumList({ qLimit = 5 }) {
    if(typeof qLimit !== 'number') {
        console.error("qLimit deve ser do tipo 'number'")
        return null;
    }


    try {
        const forumDoc = collection(db, FORUM_COLLECTION)
        const forumQuery = query(forumDoc, limit(qLimit))
        const snapshot = await getDocs(forumQuery)
        
        
        if(!snapshot) {
            throw new Error("Falha ao obter docs de Foruns")
        }

        return snapshot.docs.map(doc => new Forum({
            forumID: doc.id,
            ...doc.data()
        }))
    } catch (error) {
        console.error(error)
        return false;
    }
}



export default forumList;