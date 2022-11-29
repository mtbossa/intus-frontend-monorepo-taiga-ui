import { Component } from '@angular/core';
import { environment } from '@intus/admin/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  apiUrl = environment.apiUrl;
  title = 'admin';
}
