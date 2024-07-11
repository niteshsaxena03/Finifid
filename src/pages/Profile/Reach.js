import axios from "axios";
import { v4 as uuid } from "uuid" ;

import {doc,getDoc} from "firebase/firestore";
import { db } from "../../Firebase/firebaseContext.jsx";

// Total Data ! 

let barData = {
    Totalsum : 0 , 
    sum :{
        Student : 0 , 
        Professional : 0 ,
        Influencer : 0 , 
        Technical : 0 , 
        Artist : 0 ,
        Official : 0 , 
    }
}

// Format 
let diplayFormat = [] ;




// Data from database 
async function getData(data){

    try{
        diplayFormat = [] ;
        barData = {
            Totalsum : 0 , 
            sum :{
                Student : 0 , 
                Professional : 0 ,
                Influencer : 0 , 
                Technical : 0 , 
                Artist : 0 ,
                Official : 0 , 
            }
        }
        const userDocRef = doc(db, "users", data.email);
        const userDoc = await getDoc(userDocRef);
        return calculateData((userDoc.data()).category)
    }
    catch(err){
        console.log("Error",err) ;
    }
}









// 2. Manipulation !
function calculateData(data){

    // Calulating Value ! 
        console.log("passed",data );
   
        // Each Sum : 
        barData.sum.Student+= data.Student ; 
        barData.sum.Professional += data.Professional ; 
        barData.sum.Influencer += data.Influencer ; 
        barData.sum.Artist += data.Artist ; 
        barData.sum.Technical += data.Technical ; 
        barData.sum.Official += data.Official ; 


        // Total Sum : 

        barData.Totalsum += data.Student + data.Professional + data.Influencer + data.Artist + data.Technical + data.Official ; 

        console.log("All details", barData );

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
    getFilter("Official",barData.sum.Official) ; 



    return diplayFormat ;
}



export {getData} ;







