import Forum from "../../app/models/Forum";

async function queryListDiscussao(forum) {
    if(!(forum instanceof Forum)) {
        return null;
    }

    try {
        
        return true;
    } catch(err) {
        return false;
    }
}


export default queryListDiscussao