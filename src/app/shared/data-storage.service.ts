import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {}

  storeShoppingList() {
    const shoppingListItems = this.shoppingListService.getIngredients();
    this.http
      .put(
        'https://angular-final-project-5d150-default-rtdb.europe-west1.firebasedatabase.app/shoppingListItems.json',
        shoppingListItems
      )
      .subscribe((res) => console.log(res));
  }

  fetchShoppingListItem() {
    return this.http
      .get<Ingredient[]>(
        'https://angular-final-project-5d150-default-rtdb.europe-west1.firebasedatabase.app/shoppingListItems.json'
      )
      .pipe(
        tap((ingredients) => {
          this.shoppingListService.setIngredients(ingredients);
        })
      );
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://angular-final-project-5d150-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((res) => console.log(res));
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://angular-final-project-5d150-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );

    // let token = null; //*FORMA MAS FACIL DE HACERLO
    // this.authService.user.pipe(take(1)).subscribe((user) => {
    //   token = user.token;
    // });
    // return this.http
    //   .get<Recipe[]>(
    //     'https://angular-final-project-5d150-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
    //     {
    //       params: new HttpParams().set('auth', token),
    //     }
    //   )
    //   .pipe(
    //     map((recipes) => {
    //       return recipes.map((recipe) => {
    //         return {
    //           ...recipe,
    //           ingredients: recipe.ingredients ? recipe.ingredients : [],
    //         };
    //       });
    //     }),
    //     tap((recipes) => {
    //       this.recipeService.setRecipes(recipes);
    //     })
    //   );
  }
}
