import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';
import { Upload } from '../services/upload';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-create-recipe-page',
  templateUrl: './create-recipe-page.component.html',
  styleUrls: ['./create-recipe-page.component.scss'],
})
export class CreateRecipePageComponent {
  form: FormGroup;
  selectedFile: FileList;
  allUpLoads = {};
  currentUpload: Upload;

  constructor(
    private _fb: FormBuilder,
    private service: RecipesService,
    private router: Router,
    public auth: AuthService,
    private http: HttpClient,
    private upload: UploadService
  ) {
    this.form = _fb.group({
      recipeName: [],
      description: [],
      steps: _fb.array([]),
    });
  }

  addStepGroup() {
    return this._fb.group({
      title: [],
      instruction: [],
      pictureUrl: [],
      videoUrl: [],
    });
  }

  create() {
    const user = this.auth.getUser();
    const name = user?.displayName ? user.displaName : 'Anonymous';
    let recipe = {
      name: name,
      title: this.recipeName.value,
      description: this.description.value,
      steps: this.steps.value,
    };

    const recipeWithUrl = this.inserPicUrltoSteps(recipe);

    this.service.createRecipe(recipeWithUrl).subscribe({
      next: (data: any) => {
        let path = '';
        this.router.navigate([path]);
      },
      error: (error) => console.error('There was an error!', error),
    });
  }
  addNewStep() {
    this.steps.push(this.addStepGroup());
  }
  removeStep(index) {
    this.steps.removeAt(index);
    delete this.allUpLoads[index];
  }

  onFileSelected(event, i) {
    this.selectedFile = event.target.files;
    let file = this.selectedFile.item(0);
    console.log(file, 'file');

    this.currentUpload = new Upload(file);

    this.allUpLoads[i] = this.currentUpload;
    console.log(this.currentUpload, 'con');
    this.upload.pushUpload(this.currentUpload);
  }

  inserPicUrltoSteps(recipe) {
    let addUrlRecipe = recipe;
    let keys = Object.keys(this.allUpLoads);
    for (let i in keys) {
      addUrlRecipe.steps[i].pictureUrl = this.allUpLoads[i].url;
    }
    return addUrlRecipe;
  }

  get steps() {
    return this.form.get('steps') as FormArray;
  }

  get recipeName() {
    return this.form.get('recipeName');
  }

  get description() {
    return this.form.get('description');
  }
}
