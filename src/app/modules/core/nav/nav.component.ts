import { Component } from "@angular/core";
import { BaseComponent } from "../../shared/components/base.component";

@Component({
  selector: "nav",
  templateUrl: "nav.component.html",
  styleUrls: ["nav.component.css"]
})
export class NavComponent extends BaseComponent {
  opened: boolean = false;

  ngOnInit() {
    this.eventBusService.connect("on-toggle-nav", () => {
      this.toggleNav();
    });
    this.eventBusService.connect("on-close-nav", () => {
      this.opened = false
    });
  }

  toggleNav = () => {
    this.opened = !this.opened;
  };

  logout = () => {
    this.opened = false
    this.authService.logout()
  }
}
