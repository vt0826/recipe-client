import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//components
import { DashboardPageComponent } from '../dashboard-page/dashboard-page.component';
import { CreateRecipePageComponent } from '../create-recipe-page/create-recipe-page.component';
import { RecipePageComponent } from '../recipe-page/recipe-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: DashboardPageComponent,
      },
      {
        path: 'create',
        component: CreateRecipePageComponent,
      },
      {
        path: 'recipe/:id',
        component: RecipePageComponent,
      },
      {
        path: '**',
        component: NotFoundPageComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RoutesModule {}
