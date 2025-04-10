import { fetch } from 'expo/fetch'
import { GIPHY_API_KEY } from '../firebase/conexao'

const GIPHY_URL = 'https://api.giphy.com/v1/gifs/'

async function getGiphy({ uri }) {
    if(!uri || typeof uri !== 'string' || uri.trim() === '') return null

    const reference = `${GIPHY_URL}${ uri.replace("[*]", GIPHY_API_KEY) }`
    try {
        const resp = await fetch(reference, {
            headers: { Accept: 'application/json'}
        })

        if(!resp.ok) {
            throw new Error("Erro ao executar fetch() em getGiphy()")
        }
        
        const data = await resp.json()

        if(!Array.isArray(data.data)) {
            return [data.data.images.original.url]
        }

        return data.data.map((imgData) => imgData.images.original.url).filter(Boolean)
    } catch(err) {
        console.error("ERROR in getGiphy : " + err)
        return []
    }
}


export default getGiphy;