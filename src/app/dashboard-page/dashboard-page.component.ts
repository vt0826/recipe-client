import { RecipesService } from './../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  recipes: object;

  constructor(private router: Router, private service: RecipesService) {}
  navigateToRecipe(id) {
    let path = '/recipe/' + id;
    this.router.navigate([path]);
  }
  ngOnInit(): void {
    this.service.getAllRecipes().subscribe((response) => {
      this.recipes = response;
    });
  }
}
