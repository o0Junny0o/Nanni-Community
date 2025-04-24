import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { DISCUSSAO_COLLECTION, DISCUSSAO_TAG } from "../../model/refsCollection";
import { db } from "../../service/firebase/conexao";
import Discussao from "../../model/Discussao";
import TagNormalize from "../../utils/TagNormalize";

async function discussaoList({ forumPath, qLimit, qDateBy, qTags }) {
    if(!forumPath || forumPath.trim() === '') {
        return null;
    }

    if(!qTags) {
        return null;
    }

    if(!Array.isArray(qTags)) {
        qTags = [qTags]
    }

    qTags = qTags.map(tag => TagNormalize(tag))

    try {
        const queryArgs = [
            // qStartAt || qStartAt > 0 ? 
            qLimit  || qLimit > 0   ? limit(qLimit)                     : null,
            qDateBy                 ? orderBy(qDateBy)                  : null,
            qTags.length > 0        ? where(DISCUSSAO_TAG, "in", qTags) : null,
        ].filter(Boolean)

        const path = `${forumPath}/${DISCUSSAO_COLLECTION}`
        const discDoc = query(collection(db, path), ...queryArgs)
        const snapshot = await getDocs(discDoc)
        
        return snapshot.docs.map(disc => new Discussao({
            discussaoID: disc.id,
            ...disc.data()
        }))
    } catch (err) {
        return err;
    }
} 



export default discussaoList;