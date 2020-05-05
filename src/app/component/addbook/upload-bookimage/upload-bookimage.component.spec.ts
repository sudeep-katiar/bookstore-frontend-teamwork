import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBookimageComponent } from './upload-bookimage.component';

describe('UploadBookimageComponent', () => {
  let component: UploadBookimageComponent;
  let fixture: ComponentFixture<UploadBookimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBookimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBookimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
