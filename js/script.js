// //api >> app programming interface

// //json>> js object notation [ {},{}] , {}

// //ajax >>asyncrounous js and xml

// 99 >> ms    ActiveXObject

// 2004 >> XMLHttpRequest >> obj

// single page app >> web without refresh noreload   SPA

/**
 * method
 * 
 * get >>get data
 * 
 * post >> send data
 * 
 * put >> update data
 * 
 * patch >> update
 * 
 * delete >> delete data
 * 
 * 
 * 
 * readyState = 0  conec not stablished
 * readyState = 1 make conec
 * readyState = 2 req recived
 * readyState = 3 req processing
 * readyState = 4 response ready
 * 
 * 
 * status == 404 eror page not found
 * 
 * status == 403  forbidden
 * 
 * status == 500  internal server error
 * 
 * 
 * 200 == ok

 * 
 * 
 */

var row = document.getElementById('rowData');

let singleRecipe = document.querySelector(".singleRecipe");

let modalTitle = document.querySelector(".modal-title");

let select = document.querySelector(".select");


select.addEventListener('change',function(){

    let index = select.selectedIndex;

    let term = this.options[index].innerHTML;

    console.log(term);

    makeCall(term);
});

let ListOfData = [];

async function makeCall(klma){

    let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${klma}`);
    
    if(response.ok != true){
        console.log("error");
    }

    let responseBody = await response.json();



    ListOfData = responseBody.recipes;

    displayData();
    // ******************* //
    console.log(klma);
    // ******************* //
}

function displayData(){

    var str = '';

    for (var i = 0; i < ListOfData.length; i++) {

        str += `<div class="col-lg-3 col-md-4 col-sm-6 mb-4 text-center">
        <div class="one-recipe">
            <img onclick="getSingleRecipe('${ListOfData[i].recipe_id}')" src="${ListOfData[i].image_url}" class='img-fluid' data-bs-toggle="modal" data-bs-target="#recipeId" />
            <h2>${ListOfData[i].publisher}</h2>
            <h4>${ListOfData[i].title}</h4>
        </div>
        </div>`;

    }

  row.innerHTML = str;
}

let oneRecipe = {};

async function getSingleRecipe(id){

    let response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    
    if(response.ok != true){
        console.log("error");
    }

    let responseBody = await response.json();
     oneRecipe = responseBody.recipe;

     console.log(oneRecipe);

     displaySingleRecipe();
}

function displaySingleRecipe(){

    let lis = "";
    for(let i =0; i < oneRecipe.ingredients.length;i++){
        lis +=`<li>${oneRecipe.ingredients[i]}</li>`;
    };

    modalTitle.innerHTML = oneRecipe.title;

    let str =` 
         <div class="recipe-img">
            <img src="${oneRecipe.image_url}" class=" mb-3" alt="">
            <ol>${lis}</ol>
        </div>`;
        singleRecipe.innerHTML =  str ;

}

/*
async function makeAll(){
    await makeCall("salad");
    await makeCall("pizza");
    await makeCall("pasta");
    console.log("the end");
}
makeAll();
*/