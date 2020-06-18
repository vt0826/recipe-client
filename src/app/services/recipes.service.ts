import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private baseUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getAllRecipes() {
    console.log(this.baseUrl);
    return this.http.get(this.baseUrl + '/recipes');
  }
  getRecipeById(id) {
    const options = id ? { params: new HttpParams().set('id', id) } : {};

    return this.http.get(this.baseUrl + '/recipes', options);
  }

  createRecipe(recipe) {
    return this.http.post(this.baseUrl + '/recipes', { recipe });
  }

  /* updatePost(post) {
    return this.http.put(this.url + '/' + post.id, post);
  } */
  /* deletePost(post) {
    return this.http.delete(this.url + '/' + post.id).pipe(
       catchError((error: HttpErrorResponse) => {
        return Observable.throw(new AppError());
      })
    ); 
  } */
}
