import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { EventBusService } from "./event-bus.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Project } from "../../shared/models/project.model";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  fireDatabase: AngularFireDatabase;

  constructor(
    public router: Router,
    public db: AngularFireDatabase,
    private _snackBar: MatSnackBar,
    public eventBus: EventBusService
  ) {
    this.fireDatabase = db;
  }

  load = (callback: any) => {
    return this.fireDatabase.database
      .ref("projects")
      .get()
      .then((data) => {
        callback(data);
      });
  };

  loadByName = (name?: string | null) => {
    if(name != null) {
      this.eventBus.emit("on-activate-spinner");
      return this.fireDatabase.database.ref("projects/" + name).get()
    }
    return
  }

  save = async (project: Project, name?: string | null) => {
    this.eventBus.emit("on-activate-spinner");
    let p = Object.assign(new Project(), project);
    p.until = p.until.toString();
    p.from = p.from.toString();
    if(name != null)
      await this.fireDatabase.database.ref("projects/" + name).remove()
    this.fireDatabase.database.ref("projects/" + project.name).set(p, (e) => {
      this.eventBus.emit("on-deactivate-spinner");
      this._snackBar.open("Gespeichert", "", {
        duration: 3000
      });
    });
  };

  delete = (projectName: string) => {
    this.eventBus.emit("on-activate-spinner");
    this.fireDatabase.database.ref("projects/" + projectName).remove((a: Error | null) => {
      this.eventBus.emit("on-deactivate-spinner");
      this._snackBar.open("Gelöscht", "", {
        duration: 3000
      });
      this.router.navigate(['/search/projects'])
    })
  }
}
