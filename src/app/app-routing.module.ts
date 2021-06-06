import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/core/login/login.component';
import { DashboardComponent } from './modules/core/dashboard/dashboard.component';
import { ProjectEditorComponent } from './modules/core/project/editor/project-editor.component';
import { ProjectSearchComponent } from './modules/core/project/search/project-search.component';

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "login", component: LoginComponent },
  { path: "editor/project", component: ProjectEditorComponent },
  { path: "search/projects", component: ProjectSearchComponent },
  { path: "editor/project/:name", component: ProjectEditorComponent },
  { path: "search/projects/:search", component: ProjectSearchComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
