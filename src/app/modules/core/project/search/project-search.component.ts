import { ParamMap } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import { Component, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from "src/app/modules/shared/models/project.model";
import { BaseComponent } from "src/app/modules/shared/components/base.component";
import { DialogComponent } from 'src/app/modules/shared/components/dialog.component';

@Component({
  selector: "project-search",
  templateUrl: "project-search.component.html",
  styleUrls: ["project-search.component.css"]
})
export class ProjectSearchComponent extends BaseComponent{
  search?: string | null;
  projects: MatTableDataSource<Project> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'description', 'status', 'from', 'until', 'actions'];

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit() {
    this.eventBusService.emit('on-title', 'Projekt-Suche')
    this.eventBusService.emit("on-activate-spinner");
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.search = params.get('search');
      this.onSearch()
    })
    this.load()
  }

  load() {
    this.projectService.load((result: any) => {
      let data = result.val();
      this.projects.data = []
      if (data != null)
        Object.keys(data).forEach((p) => {
          let project = Object.assign(new Project(), data[p]);
          this.projects.data.push(project);
        });
      this.projects.sort = this.sort;
      this.eventBusService.emit("on-deactivate-spinner");
    });
  }

  onSearch() {
    if(this.search != null)
      this.projects.filter = String(this.search?.trim().toLowerCase())
    else
      this.projects.filter = ""
  }

  createProject() {
    this.router.navigate(["/editor/project"]);
  }

  deleteProject = (name: string) => {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { 
        content: `Wollen Sie das Projekt "${name}" wirklich löschen?`,
        title: "Projekt löschen"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.projectService.delete(name);
        this.load()
      }
    });
  }
}
