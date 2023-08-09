import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  constructor(private shoppingListService: ShoppingListService) {}
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test Recipe',
  //     'This is simply a test',
  //     'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image_2x/public/2022-05/Tomato-Pie_0256.jpg?itok=FipXLNDr',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Another Test Recipe',
  //     'This is simply a test',
  //     'https://cdn.casaeculinaria.com/wp-content/uploads/2023/04/05163949/Hamburguer-artesanal.webp',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 2)]
  //   ),
  // ];

  //recipeSelected = new EventEmitter<Recipe>();
  getRecipes() {
    return this.recipes.slice(); //return slice with no arg to return a copy of the array and not the reference to this one
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientToShopList(ingredients: Ingredient[]) {
    this.shoppingListService.addMultipleIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
