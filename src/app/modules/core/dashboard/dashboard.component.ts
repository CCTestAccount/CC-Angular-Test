import { Component } from '@angular/core';
import { BaseComponent } from "src/app/modules/shared/components/base.component";

@Component({
  selector: "dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.sass"]
})
export class DashboardComponent extends BaseComponent {
    projects?: any;
    search?: string;

    get projectCount() {
        return (this.projects != null) ? Object.keys(this.projects).length : 0
    }

    get projectNames() {
        return (this.projects != null) ? Object.keys(this.projects) : []
    }

    get projectsInReview() {
        return this.projectCountByStatus('In Review')
    }

    get projectsInArbeit() {
        return this.projectCountByStatus('In Arbeit')
    }

    get projectsOffen() {
        return this.projectCountByStatus('Offen')
    }

  ngOnInit() {
    this.eventBusService.emit('on-activate-spinner')
    this.eventBusService.emit('on-title', 'Dashboard')
    this.projectService.load((result: any) => {
        this.eventBusService.emit('on-deactivate-spinner')
        this.projects = result.val();
    })
  }

  projectCountByStatus = (status: string) => {
    if (this.projects != null) {
        let count = 0
        Object.keys(this.projects).forEach((key) => {
            if(this.projects[key].status == status)
                count++
         })
         return count
    }
    return 0
  }

  onSearch = () => {
      this.navigateTo('/search/projects/' + this.search)
  }
}
