import { Component } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Project } from "../../../shared/models/project.model";
import { DataSnapshot } from "@angular/fire/database/interfaces";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "../../../shared/components/base.component";
import { DialogComponent } from "src/app/modules/shared/components/dialog.component";

@Component({
  selector: "project-editor",
  templateUrl: "project-editor.component.html",
  styleUrls: ["project-editor.component.css"]
})
export class ProjectEditorComponent extends BaseComponent {
  name?: string | null;
  public form: FormGroup = new FormGroup({
    status: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    until: new FormControl(''),
    from: new FormControl('')
  });
  
  get isNameNull() {
    return this.name == null
  }

  ngOnInit() {
    this.load()
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  load() {
    this.eventBusService.emit('on-title', 'Projekt-Editor')
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.name = params.get('name')
      this.projectService.loadByName(this.name)
      ?.then((result: DataSnapshot) => {
        Object.keys(result.val()).forEach((key) => {
          if(["from", "until"].includes(key))
            this.form.controls[key].setValue(new Date(result.val()[key]))
          else
            this.form.controls[key].setValue(result.val()[key])
        });
        this.eventBusService.emit("on-deactivate-spinner");
      })
      .catch(() => {
        this.router.navigate(['/search/projects'])
      })
    })
  }

  saveProject = async () => {
    let p = new Project();
    p.name = this.form.controls['name'].value;
    p.status = this.form.controls['status'].value;
    p.description = this.form.controls['description'].value;
    p.until = this.form.controls['until'].value.toString();
    p.from = this.form.controls['from'].value.toString();
    await this.projectService.save(p, this.name);
    this.router.navigate(['/editor/project/' + p.name])
  };

  deleteProject = () => {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { 
        content: `Wollen Sie das Projekt "${this.form.controls['name'].value}" wirklich löschen?`,
        title: "Projekt löschen"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.projectService.delete(this.form.controls['name'].value);
    });
  }
}
