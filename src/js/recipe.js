import $ from 'jquery';
import RecipeTemplate from './hbs/recipe.hbs'

export default class Recipe {
    constructor () {
        this.initEls();
    }

    initEls() {
        this.$els = {
            recipe: $('.right-part'),
        }
    }

    getRecipe (name, dishtype, calories) {

        //console.log('INPUT : '+name+' DISHTYPE : '+dishtype+' CALORIES : '+calories);
        const dishtypeParam = dishtype ? `&dishType=${dishtype}` : "";
        const caloriesParam = calories ? `&calories=${calories}` : "";
        const api = {
            endpoint: `https://api.edamam.com/search?app_id=04d4343d&app_key=295d476b
            41b04b07f017dab57f8a7fc4&q=${name+dishtypeParam+caloriesParam}&to=25`
        }

        $.getJSON(api.endpoint)
            .then((response) => {
                this.renderRecipe(response);
                console.log(response);
            })
            .catch((err) => {
                console.log('Error Recipe', err);
                alert('No matching results');
            });

    }

    renderRecipe (recipeData) {
        //console.log(recipeData); //Affiche la data correspondant au endpoint
        const recipeCount = recipeData.to;
        const recipeRand = Math.floor(Math.random() * recipeCount);

        const recipeTitle = recipeData.hits[recipeRand].recipe.label;
        const recipeImage = recipeData.hits[recipeRand].recipe.image;
        const recipeUrl = recipeData.hits[recipeRand].recipe.url;
        const recipeSource = recipeData.hits[recipeRand].recipe.source;
        const recipeYield = recipeData.hits[recipeRand].recipe.yield;
        const recipeCalories = Math.floor(recipeData.hits[recipeRand].recipe.calories/recipeYield);
        const recipeIngredients = recipeData.hits[recipeRand].recipe.ingredientLines;


        const recipe = RecipeTemplate({
            title: recipeTitle,
            image: recipeImage,
            url: recipeUrl,
            source: recipeSource,
            number: recipeYield,
            calories: recipeCalories,
            ingredients: recipeIngredients
        });
        this.$els.recipe.empty();
        this.$els.recipe.append(recipe);
        $('div.right-part').show();
        this.$els.recipe.addClass('is-ready');
    }
}