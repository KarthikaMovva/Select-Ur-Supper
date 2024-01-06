async function searchResults(inputvalue) {
  // searchResults function is fetching the data from provided link to display search results
  try {
    let filter = await axios.get(            
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputvalue}`
    );
    // we are sending fetched data into displayOnscreen function to display in webpage.
    displayOnscreen(filter.data.meals);  
    console.log(filter);
     console.log(filter.data)
  } catch (error) {
    console.log(error.message);
  }
}
function fetchData() {
  // this fetchData function is sending the user input to searchResult function to get the search results accoding to user input.
  let requiredValue = document.getElementById("inputtake").value;
  searchResults(requiredValue);
}
function displayOnscreen(meals) {
  // displayOnscreen function will display the search results in web page
  console.log(meals);
  var displayDiv = document.getElementById("list");
  displayDiv.innerHTML = "";
  // if condition will give "No Results found". if, user enters invalid input.
  if(meals==null || meals.length===0){
   let heading = document.getElementById("divide")
   heading.innerHTML="<p>No results found</p>"
  }
  // else condition will give "search results".
  else{
   let heading = document.getElementById("divide")
   heading.innerHTML="<p>Search Results</p>"
  //  Using forEach we are displaying the image and name of every item in array
  meals.forEach((element) => {
    // fetched images of search results.
    let food = element.strMealThumb; 
    // fetched names of search result images. 
    let foodname = element.strMeal;
    displayDiv.innerHTML += `<div class="image"><img src="${food}" alt="${foodname}" id="food"/>
                           <p id="randomname">${foodname}</p></div>`;
  });
  }
}


// adding event listener to search button on clicking search button fetchData function is called.
document.getElementById("search").addEventListener("click", fetchData);

// getrandomImage function is fetching the data from given link to generate random image.
async function getrandomImage(collect) {
  try {
    const url = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    // We are sending fetched data into onScreen,displayInstructions, displayNeeds, displayYoutube and displayWebsite functions to display on webpage.
    onScreen(url.data.meals[0]);
    displayInstructions(url.data.meals[0]);
    displayNeeds(url.data.meals[0])
    displayYoutube(url.data.meals[0])
    displayWebsite(url.data.meals[0])
  } catch (error) {
    console.log(error.message);
  }
}

// onScreen function is displaying the random image on web page.
function onScreen(take) {
  let random = document.getElementById("generate");

  //fetched image in random.
  let image = take.strMealThumb;

  //fetched name of random image.
  let name = take.strMeal;

  //fetched name of country.
  let area = take.strArea;

  //fetched category of random image.
  let section = take.strCategory

  random.innerHTML = "";
  random.innerHTML += `<div id="picture">
                        <p id="try">Would you like to try a dish from <span id="bold">${section} category</span>? It's truly a delight and would be perfect for today's Menu.😋</p>
                        <img src="${image}" alt="${name}" id="pic"/>
                        <p class="name">${name}</p>
                        <p class="name">${area} reciepe</p>
                     </div>`;

   let foodpic = document.getElementById("pic");
   let modal = document.getElementById("modal");

   //adding a event listener to random image on clicking modal will display.
   foodpic.addEventListener("click",function(){modal.style.display="block"
   document.getElementById("body").style.backgroundColor="rgba(0, 0, 0, 0.4)"
  })
}
  function displayInstructions(take){
  //The instructions are diplayed in modal. 
  let instruction = document.getElementById("steps")
  //fetched instructions data of random image.
  let directions=take.strInstructions
  instruction.innerHTML += "<h4>Directions</h4><br>"+directions
  }
 
function displayYoutube(take){
  //The youtube link is displayed in modal.
  let youtubelink = document.getElementById("link")
  //fetched youtubelink from data of random images.
  let linkfromData = take.strYoutube
  if(youtubelink){  
  youtubelink.innerHTML+=linkfromData}     //If, link is present in data. we will display.
 else{
   let initiate = document.getElementById("address")   //If not,there is no display of youtube link.
   initiate.style.display="none"
   youtubelink.style.display="none"
 } }

function displayWebsite(take){
  //The website link is displayed in modal.
 let websiteLink = document.getElementById("weblink")
  //fetched websitelink from data of random images.
 let weblinkData = take.strSource
 if(weblinkData){
 websiteLink.innerHTML+=weblinkData}    //If, link is present in data. we will display.
 else{
  let noDisplay = document.getElementById("src")
  noDisplay.style.display="none"         //If not,there is no display of website link.
  websiteLink.style.display="none"
 }
}

function displayNeeds(take){
 //Ingredients and measures are displayed in modal.
  let para = document.getElementById("needs")
  para.innerHTML="<h4>Ingredients</h4><br>"

  //Using for loop we are displaying all the ingredients and measures in ramdon dish.
  for(let number=1; number<100; number++){
  let ingredient = take["strIngredient"+number]
  let quantity = take["strMeasure"+number]
      if(ingredient){
                     console.log(ingredient)
                     console.log(quantity)
                      para.innerHTML+=ingredient+" - "+quantity+"<br>"}
  }  
}

//Adding event listener to webpage on load getrandomImage function is executed.
document.addEventListener("DOMContentLoaded", function () {
   getrandomImage();
 });



 let modal = document.getElementById("modal");
 let span = document.getElementById("close");

 //Adding a event listener to close button on clicking close button the modal display will change to none.
 span.addEventListener("click",function(){modal.style.display="none"
 document.getElementById("body").style.backgroundColor="white"})


