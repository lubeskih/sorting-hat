import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QblockComponent } from './qblock.component';

describe('QblockComponent', () => {
  let component: QblockComponent;
  let fixture: ComponentFixture<QblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
