import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.recipeService.getRecipes().length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      this.recipeService.getRecipes();
    }
  }
}
