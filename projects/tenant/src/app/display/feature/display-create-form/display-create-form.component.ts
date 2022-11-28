import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { TuiAlertService, TuiNotification } from "@taiga-ui/core";

import { DisplaysService } from "../../data-access/displays.service";
import {
  DisplayFormComponent,
  ValidDisplayForm,
} from "../display-form/display-form.component";

@Component({
  selector: "app-display-create-form",
  standalone: true,
  imports: [CommonModule, DisplayFormComponent],
  templateUrl: "./display-create-form.component.html",
  styleUrls: ["./display-create-form.component.scss"],
})
export class DisplayCreateFormComponent {
  constructor(
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private route: Router,
    private displaysService: DisplaysService
  ) {}

  createDisplay($event: ValidDisplayForm) {
    this.displaysService.create($event).subscribe({
      next: (res) => {
        this.route.navigate(["../displays"]);
        this.alertService
          .open(`Display criado com sucesso!`, { status: TuiNotification.Success })
          .subscribe();
      },
    });
  }
}
