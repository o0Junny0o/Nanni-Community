import queryListDiscussao from "../../hooks/forum/queryListDiscussao";
import useForumDiscussao from "../../hooks/useForum";



// Model de Forum
class Forum {
    forumID;
    userRef;
    forumName;
    forumDesc;
    forumRating;
    //
    forumListDiscussao;

    constructor(docData) {
        this.forumID = docData.forumID;
        this.userRef = docData.userRef;
        this.forumName = docData.forumName;
        this.forumDesc = docData.forumDesc;
        this.forumRating = docData.forumRating;
    }

    getForumListDiscussao() {
        if(!this.forumListDiscussao) {
            startForumListDiscussao();
        }

        return this.forumListDiscussao;
    }

    startForumListDiscussao({ qLimit = 10}) {
        this.forumListDiscussao = useForumDiscussao({ forumPath: this.getForumPath(), initialLimit: qLimit})
    }

    async getHookDiscussao() {
        return await queryListDiscussao(this.forumID)
    }

    getForumPath() {
        return `${FORUM_COLLECTION}/${this.forumID}`;
    }


    toFirestoreData() {
        return {
            userRef: this.userRef,
            forumName: this.forumName,
            forumDesc: this.forumDesc,
            forumRating: this.forumRating,
        };
    }
}


// Nome da coleção de Forum
const FORUM_COLLECTION = "Foruns"
const DISCUSSAO_COLLECTION = "Discussões"

export default { FORUM_COLLECTION, DISCUSSAO_COLLECTION, Forum}