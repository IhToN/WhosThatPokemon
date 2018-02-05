import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {GameService} from './game.service';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  // La ruta '' indica la ruta por defecto (antiguo index.html)
  {path: 'home', component: LoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  // Cualquier otra ruta no considerada en las entradas anteriores -> ERROR
  {path: '**', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
