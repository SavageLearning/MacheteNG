import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersInSkillComponent } from './workers-in-skill.component';

describe('WorkersInSkillComponent', () => {
  let component: WorkersInSkillComponent;
  let fixture: ComponentFixture<WorkersInSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkersInSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersInSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
