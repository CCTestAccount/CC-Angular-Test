import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { slideInAnimation } from "./modules/shared/slide.animation";
import { EventBusService } from "./modules/core/services/event-bus.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  spinnerProgress: string[] = [];
  spinnerVisible = false;
  title = "";

  constructor(private eventBusService: EventBusService) {
    eventBusService.connect("on-activate-spinner", () => {
      this.spinnerVisible = true;
    });
    eventBusService.connect("on-deactivate-spinner", () => {
      this.spinnerVisible = false;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
