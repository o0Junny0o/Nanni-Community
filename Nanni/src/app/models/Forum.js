import queryListDiscussao from "../../hooks/forum/queryListDiscussao";



// Model de Forum
class Forum {
    forumID;
    userRef;
    forumName;
    forumDesc;
    forumRating;
    //
    forumListDiscussao;

    constructor({ forumID, userRef, forumName, forumDesc, forumRating }) {
        this.forumID = forumID;
        this.userRef = userRef;
        this.forumName = forumName;
        this.forumDesc = forumDesc;
        this.forumRating = forumRating;

        this.forumListDiscussao = []
    }

    async getHookDiscussao() {
        return await queryListDiscussao(this.forumID)
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