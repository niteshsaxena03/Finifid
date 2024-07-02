import { v4 as uuid } from "uuid" ;

// Total Data ! 

const barData = {
    Totalsum : 0 , 
    sum :{
        Student : 0 , 
        Professional : 0 ,
        Influencer : 0 , 
        Technical : 0 , 
        Artist : 0 
    }
}

// Format 
let diplayFormat = [] ;



// 1 . Data Generate  
function getValue(){

    function getRandomValue(){
        return Math.floor(Math.random()*10000) ; 
    }

    let postData = {

        Student : getRandomValue() , 
        Professional : getRandomValue() , 
        Influencer :  getRandomValue() , 
        Technical : getRandomValue() , 
        Artist : getRandomValue() 
    }

    return postData; 
}


// Creating a new Map
let myMap = new Map();



// 2. Setting key-value pairs

function getPostData(){

    diplayFormat =[] ;

    for( let i = 1  ; i<=5 ; i++ ){
        myMap.set(`${uuid()}`,getValue()) ;  
    }



   return calculateData(myMap) ;
}


// 3. Manipulation !
function calculateData(myMap){

    // Calulating Value ! 

    for (let data of myMap.values()) {
        
        // Each Sum : 
        barData.sum.Student+= data.Student ; 
        barData.sum.Professional += data.Professional ; 
        barData.sum.Influencer += data.Influencer ; 
        barData.sum.Artist += data.Artist ; 
        barData.sum.Technical += data.Technical ; 

        // Total Sum : 

        barData.Totalsum += data.Student + data.Professional + data.Influencer + data.Artist + data.Technical ; 

    }    

   return getBarChartData(barData) ; 
}


function getFilter(name , x){
    diplayFormat.push({
        category : name ,
        Reach : Math.round((x / barData.Totalsum) * 100 * 100) / 100
    })
}


function getBarChartData(barData){
    getFilter("Student",barData.sum.Student) ; 
    getFilter("Professional",barData.sum.Professional) ; 
    getFilter("Influencer",barData.sum.Influencer) ; 
    getFilter("Artist",barData.sum.Artist) ; 
    getFilter("Technical",barData.sum.Technical) ; 



    return diplayFormat ;
}



export default getPostData ;




// --> Quotes issue in map ! 



