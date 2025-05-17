import { tenor } from "../firebase/conexao";
import IAPIServices from "../IAPIServices";

export default class TenorService extends IAPIServices {
    constructor() {
        super(`key=${tenor}`, "https://g.tenor.com/v1/")

        this.uriExtras = "&locale=pt-BR"
    }

    getByID(id) {
        const uri = `gifs?${this.apiKey}&ids=${id}`
        return this.fetch(uri)
    }


    toSource(data, type = "webp") {
        const media = data.results[0].media[0];
        if(!media[type]) return;

        return { uri: media[type].url };
    }

    getSearchPlaceholder() {
        return "Search Tenor"
    }

    getLogo() {
        require('../../assets/tenor/PB_tenor_logo_white_horizontal.png')
    }
}