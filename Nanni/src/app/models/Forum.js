import forumCreate from "../../hooks/forum/forumCreate";
import forumDelete from "../../hooks/forum/forumDelete";
import forumUpdate from "../../hooks/forum/forumUpdate";
import { FORUM_COLLECTION } from "./refsCollection";

// Model de Forum
class Forum {
    forumID;
    userRef;
    forumName;
    forumDesc;
    forumRating;

    constructor({ forumID, userRef, forumName, forumDesc, forumRating}) {
        this.forumID = forumID;
        this.userRef = userRef;
        this.forumName = forumName;
        this.forumDesc = forumDesc;
        this.forumRating = forumRating;
    }

    getForumPath() {
        if(this.forumID) {
            return `${FORUM_COLLECTION}/${this.forumID}`
        }

        return null
    }

    async create() {
        const resp = await forumCreate(this)

        if(resp.id) {
            this.forumID = resp.id
            return true;
        }

        return false;
    }

    async delete() {
        if(this.forumID) {
            return await forumDelete(this)
        }

        return false;
    }

    async update() {
        if(this.forumID) {
            return await forumUpdate(this)
        }

        return false;
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




export default Forum