import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@linkedout/api-interfaces';

@Component({
  selector: 'frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(protected http: HttpClient) {}
}
