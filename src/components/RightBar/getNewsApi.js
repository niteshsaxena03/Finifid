import NewsAPI from 'newsapi';
import axios from 'axios';

let q = 'Google' ; 
const newsapi = `https://newsapi.org/v2/everything?q=${q}&apiKey=1f16c9c0ce704f0898301082e53998ff`
let Data ; 
let filterNews = [] ; 


async function getNews(){
    let Data = (await axios.get(newsapi)).data.articles ; 
    //  Filter News : Top 5 news : 
    
     for( let i = 2 ; i<=6 ; i++ ){
        let randomNews = Data[(Math.floor(Math.random()*10))] ; 

        ( randomNews.title !== "[Removed]" ? filterNews.push(randomNews) : "" ) ;
    }

    return filterNews ; 
} 







export { getNews } ;


