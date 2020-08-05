import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'frontend-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
