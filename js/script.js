///////////////////////////////////
////////// Recipe part

const loadRecipe = async (recipe) => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipe}`);
        const data = await res.json();
        data.meals.forEach(meal => renderRecipe(meal))

    } catch (error) {
        console.log(error);
    }
}


const searchRecipe = async () => {
    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        const searchMeal = document.querySelector('#input').value.trim().toLowerCase();
        const errorMsg = document.querySelector('.error-msg');
        if (!searchMeal) return errorMsg.classList.remove('d-none');
        loadRecipe(searchMeal);
        document.querySelector('#input').value = '';
        errorMsg.innerHTML = '';
    })
}


const renderRecipe =  meal => {
    const recipeContainer = document.querySelector('.recipe-container');
    const html = `
    <div class="col-lg-3">
        <div style="margin: 0 5px 40px">
            <div class="recipe-img">
            <img class="img-fluid w-100 h-100" src="${meal.strMealThumb}" alt="${meal.idMeal}">
         <h5 class="text-center">${meal.strMeal}</h5>
        </div>
        </div>
    </div>
`;
recipeContainer.insertAdjacentHTML('beforeend', html);
}


const searchMealWithlId = async (id) => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        const meal = data.meals[0]
        const ingContainer = document.querySelector('.clicked-item');

        const html = `
        <img id="clicked-img" src="${meal.strMealThumb}" alt="image">
        <h3>${meal.strMeal}</h3>
        <h5>Ingredients</h5>
        <ul>
          <li><i class="fas fa-check-square"></i>${meal.strMeasure1} ${meal.strIngredient1}</li>
          <li><i class="fas fa-check-square"></i>${meal.strMeasure2} ${meal.strIngredient2}</li>
          <li><i class="fas fa-check-square"></i>${meal.strMeasure3} ${meal.strIngredient3}</li>
          <li><i class="fas fa-check-square"></i>${meal.strMeasure4} ${meal.strIngredient4}</li>
          <li><i class="fas fa-check-square"></i>${meal.strMeasure5} ${meal.strIngredient5}</li>
          <li><i class="fas fa-check-square"></i>${meal.strMeasure6} ${meal.strIngredient6}</li>
        </ul>
        `;
        ingContainer.insertAdjacentHTML('beforeend', html)

    } catch (err) {
        console.log(err)
    }
}


const mealHandler = async () => {
    const recipeContainer = document.querySelector('.recipe-container');
    recipeContainer.addEventListener('click', e => {
        let id;
        if (e.target.tagName === 'IMG') id = e.target.getAttribute('alt');
       searchMealWithlId(id)

    })
}
mealHandler()


const displayClickedItem = () => {
    const recipeContainer = document.querySelector('.recipe-container');
    recipeContainer.addEventListener('click', () => {
        document.querySelector('.clicked-item').style = "visibility: visible; opacity: 1; transition all .3s;"
        recipeContainer.style.display = 'none';
        document.querySelector('form').style.display = 'none';
    })

}

displayClickedItem()