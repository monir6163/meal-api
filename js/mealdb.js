const searchResultId = document.getElementById('search-result');
const allMealShow = document.getElementById('modal');
const spinner = `
<div class="text-center">
    <div class="spinner-border" role="status" id = "spin">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>
`;
document.getElementById('not-found').style.display = 'none';

const searchFood = async () => {
    const inputField = document.getElementById('name');
    const searchResult = inputField.value;
    
    inputField.value = "";
    document.getElementById('not-found').style.display = 'none';
    if (searchResult == "") {
       const message = document.getElementById('erorr-message');
       message.innerHTML = `<div class=" w-100 mx-auto alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Hello 3rd Person!</strong> Please Enter Your FuckUp Name.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>` 
    }
    else{
        searchResultId.innerHTML = spinner;
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchResult}`;
        // fetch(url)
        try{
            const res = await fetch(url);
            const data = await res.json();
            displayReasult(data.meals)
        }
        // .then(res => res.json())
        // .then(data => displayReasult(data.meals))
        // .catch(error => displayerror(error));
        catch{
            searchResultId.innerHTML = spinner;
            document.getElementById('not-found').style.display = 'block';
            const message = document.getElementById('not-found');
            message.innerHTML = `<div class=" w-100 mx-auto alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Hello 3rd Person!</strong> Search Result Product Not Found.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        }
        document.getElementById('spin').style.display = "none";
    }
}
// const displayerror = error => {
//     document.getElementById('not-found').style.display = 'block';
//     const message = document.getElementById('not-found');
//        message.innerHTML = `<div class=" w-100 mx-auto alert alert-danger alert-dismissible fade show" role="alert">
//   <strong>Hello 3rd Person!</strong> Search Result Product Not Found.
//   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
// </div>`;
// }
const displayReasult = meals => {
    const searchResultId = document.getElementById('search-result');
    
    searchResultId.textContent = "";
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
            </div>
            <div class = "card-footer text-center"><button onclick = "loadFoodDetails(${meal.idMeal})" class = "btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>
        </div>
        `;
        searchResultId.appendChild(div);
    });
}
const loadFoodDetails = async mealId => {
    allMealShow.innerHTML = spinner;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
    // .then(res => res.json())
    // .then(data => displayMealDetails(data.meals[0]))
}
const displayMealDetails = meal => {
    const allMealShow = document.getElementById('modal');
    allMealShow.textContent = "";
    allMealShow.innerHTML = `<h2>Nmae: ${meal.strMeal}</h2> <h4>Area: ${meal.strArea}</h4> <h5>Category: ${meal.strCategory}</h5> <img width = 100% src = "${meal.strMealThumb}"> <p>Instruction: ${meal.strInstructions.slice(0,250)}</p> <a href = "${meal.strSource}">Source: ${meal.strMeal}</a> <br> <a href = "${meal.strYoutube}">Youtube: ${meal.strMeal}</a>`
}