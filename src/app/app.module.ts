import { NgModule } from "@angular/core";
import { GaugeModule } from 'angular-gauge';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { AngularFireModule } from "@angular/fire";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatTabsModule } from "@angular/material/tabs";
import { MatSortModule } from '@angular/material/sort'; 
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatTreeModule } from "@angular/material/tree";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from '@angular/material/table'; 
import { BrowserModule } from '@angular/platform-browser';
import { environment } from "src/environments/environment";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatNativeDateModule } from "@angular/material/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatDatepickerModule } from "@angular/material/datepicker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { NavComponent } from './modules/core/nav/nav.component';
import { LoginComponent } from "./modules/core/login/login.component";
import { HeaderComponent } from './modules/core/header/header.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DialogComponent } from './modules/shared/components/dialog.component';
import { DashboardComponent } from './modules/core/dashboard/dashboard.component';
import { ProjectSearchComponent } from "./modules/core/project/search/project-search.component";
import { ProjectEditorComponent } from "./modules/core/project/editor/project-editor.component";

@NgModule({
  declarations: [
    NavComponent,
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DialogComponent,
    DashboardComponent,
    ProjectSearchComponent,
    ProjectEditorComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    BrowserModule,
    MatCardModule,
    MatListModule,
    MatSortModule,
    MatIconModule,
    MatTreeModule,
    MatTabsModule,
    BrowserModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    AppRoutingModule,
    MatToolbarModule,
    MatGridListModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    GaugeModule.forRoot(),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent, NavComponent, HeaderComponent]
})
export class AppModule { }
