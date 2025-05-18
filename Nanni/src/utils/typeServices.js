import GiphyService from '../service/giphy/GiphyService'
import TenorService from '../service/giphy/TenorService'


const typeServices = { 
  "giphy": () => new GiphyService(),
  "tenor": () => new TenorService(),
}


export function instaceServices() {
  return Object.fromEntries(
    Object.entries(typeServices).map(([k, serv]) => [k, serv()])
  );
}


export default typeServices