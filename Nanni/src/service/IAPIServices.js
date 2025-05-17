import fetchAPI from "./giphy/fetchAPI";

export default class IAPIServices {
    constructor(apiKey, url) {
        if(!apiKey || !url) {
            throw new Error("Classe de [APIService] precisa de uma apiKey");
        }
        
        this.apiKey = apiKey;
        this.url = url;
    }

    getLogo() {
        throw new Error("Método [getLogo] não foi implementado.")
    }

    getSearchPlaceholder() {
        return undefined;
    }

    fetch(uri) {
        const req = `${this.url}${uri}`

        return fetchAPI(req);
    }

    toSource(data, type) {
        throw new Error("Método [getSource] não foi implementado")
    }
}