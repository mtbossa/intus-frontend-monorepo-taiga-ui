import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiSliderModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, TuiSliderModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {}
