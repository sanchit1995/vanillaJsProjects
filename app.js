const search=document.getElementById('search'),
    resultHeading=document.getElementById('result-heading'),
    submit=document.getElementById('submit'),
    mealsEl=document.getElementById('meals'),
    random=document.getElementById('random'),
    disIngredient=document.getElementById('dis-ing');
//for searching a meal by name
function searchMeal(e){
    e.preventDefault();
    const meal=search.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data.meals===null){
            resultHeading.innerHTML=`No such item found ${meal}`;
        }
        else{    
            resultHeading.innerHTML=data.meals.map(meal=>`
                <h2 style="color:orange;">Search result for ${meal.strMeal}</h2>
                <h2 style="font-size:28px;">Cooking instructions:<br>
                <div style="margin-bottom:2rem;"> ${meal.strInstructions}</div>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            `)
        }
        const meal=data.meals[0]
        getIngredient(meal);
    })
}   
//getting a random meal
function getRandonMeal(){
    mealsEl.innerHTML='';
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res=>res.json())
    .then(data=>{
        let i=2;
        resultHeading.innerHTML=data.meals.map(meal=>`
            <h2 style="color:orange;">Search result for ${meal.strMeal}</h2>
            <div style="font-size:28px; color:orange; margin-bottom:1rem;">Cooking instructions:</div>
            <div style="margin-bottom:2rem;"> ${meal.strInstructions}</div>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>  
        `)
        const meal=data.meals[0]
        getIngredient(meal);
    })
}
//getting the ingredient of the meal
function getIngredient(meal){
        const ingredients=[];
        for(let i=1;i<=20;i++){
            if(`${meal[`strIngredient${i}`]}`===""){
                break;
            }
            else{
            ingredients.push(`${meal[`strIngredient${i}`]}`);}
        }
        disIngredient.innerHTML='Ingredients reqiured are: ';
        mealsEl.innerHTML=ingredients;
    }
//Event Listeners
submit.addEventListener('submit',searchMeal);
random.addEventListener('click',getRandonMeal);
