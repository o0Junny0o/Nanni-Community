import GiphyService from '../../../../service/giphy/GiphyService'
import TenorService from '../../../../service/giphy/TenorService'


const typeServices = { 
  "giphy": () => new GiphyService(),
  "tenor": () => new TenorService(),
}


export default typeServices