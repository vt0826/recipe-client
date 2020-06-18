import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
})
export class RecipePageComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  recipe: any;
  defaultPic =
    'https://firebasestorage.googleapis.com/v0/b/recipe-a78ee.appspot.com/o/uploads%2Ff.jpeg?alt=media&token=f2ce2ab7-9aa1-4b1c-827b-e75a250fe392';

  constructor(
    private _formBuilder: FormBuilder,
    private service: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  naviagteToDashboard() {
    let path = '';
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.service.getRecipeById(id).subscribe((response) => {
        this.recipe = response[0];
      });
    });
  }
}
