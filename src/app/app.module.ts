import { NgModule } from '@angular/core';
// app imports
import { SafePipe } from './pipe/safe-pipe';
import { MaterialComponentsModule } from './module-components/material-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutesModule } from './module-components/routes.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

//components imports
import { AppComponent } from './app.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreateRecipePageComponent } from './create-recipe-page/create-recipe-page.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { TimerComponent } from './timer/timer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipePageComponent,
    CreateRecipePageComponent,
    DashboardPageComponent,
    NotFoundPageComponent,
    NavbarComponent,
    TimerComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialComponentsModule,
    RoutesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
