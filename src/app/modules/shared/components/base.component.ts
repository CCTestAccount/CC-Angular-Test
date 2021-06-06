import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { ProjectService } from "../../core/services/project.service";
import { EventBusService } from "../../core/services/event-bus.service";

@Component({
  selector: "base",
  templateUrl: "base.component.html"
})
export class BaseComponent {
  constructor(
    public router: Router,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public authService: AuthService,
    public projectService: ProjectService,
    public eventBusService: EventBusService
  ) {}

  navigateTo(path: string) {
    this.eventBusService.emit('on-close-nav')
    this.router.navigate([path])
  }
}
