import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTaskDialogComponent } from './remove-task-dialog.component';

describe('RemoveTaskDialogComponent', () => {
  let component: RemoveTaskDialogComponent;
  let fixture: ComponentFixture<RemoveTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveTaskDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
