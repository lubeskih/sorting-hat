import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QblockQuestionComponent } from './qblock-question.component';

describe('QblockQuestionComponent', () => {
  let component: QblockQuestionComponent;
  let fixture: ComponentFixture<QblockQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QblockQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QblockQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
