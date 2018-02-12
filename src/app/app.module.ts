import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {GameService} from './game.service';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {GameroomComponent} from './gameroom/gameroom.component';
import {FileUploadModule} from 'ng2-file-upload';
import { IngamePipe } from './pipes/ingame.pipe';

const routes: Routes = [
  // La ruta '' indica la ruta por defecto (antiguo index.html)
  {path: 'home', component: LoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'game/:roomid', component: GameroomComponent},
  // Cualquier otra ruta no considerada en las entradas anteriores -> ERROR
  {path: '**', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    GameroomComponent,
    IngamePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FileUploadModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
