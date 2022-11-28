import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { TuiAlertService, TuiDialogService, TuiNotification } from "@taiga-ui/core";
import { DisplaysService } from "../../../display/data-access/displays.service";

import { RaspberriesService } from "../../data-access/raspberry.service";
import {
  RaspberryFormComponent,
  ValidRaspberryForm,
} from "../raspberry-form/raspberry-form.component";

@Component({
  selector: "app-raspberry-create-form",
  standalone: true,
  imports: [CommonModule, RaspberryFormComponent],
  templateUrl: "./raspberry-create-form.component.html",
  styleUrls: ["./raspberry-create-form.component.scss"],
})
export class RaspberryCreateFormComponent {
  displays$ = this.displayService.getDisplayOptions({ whereDoesntHaveRaspberry: true });

  constructor(
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    @Inject(TuiDialogService)
    private readonly dialogService: TuiDialogService,
    private route: Router,
    private raspberrysService: RaspberriesService,
    private displayService: DisplaysService
  ) {}

  createRaspberry($event: ValidRaspberryForm) {
    this.raspberrysService.create($event).subscribe({
      next: (res) => {
        this.route.navigate(["../raspberries"]);
        this.alertService
          .open(`Raspberry criado com sucesso!`, { status: TuiNotification.Success })
          .subscribe();
        this.dialogService
          .open(`Anote o token do Raspberry: ${res.token?.plainTextToken}`, {
            label: `Token da API`,
            size: `s`,
            data: { button: `Fechar` },
          })
          .subscribe();
      },
    });
  }
}
