import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LookupsComponent } from './lookups.component';

describe('LookupsComponent', () => {
  let component: LookupsComponent;
  let fixture: ComponentFixture<LookupsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
