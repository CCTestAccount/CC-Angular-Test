import { Component } from "@angular/core";
import { BaseComponent } from "../../shared/components/base.component";

@Component({
  selector: "header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.css"]
})
export class HeaderComponent extends BaseComponent {
  title = "App"

  get currentUserName() {
    return this.authService.currentUser?.email
  }

  ngOnInit() {
    this.eventBusService.connect('on-title', (property?: any) => {
      this.title = String(property)
    })
  }
}
