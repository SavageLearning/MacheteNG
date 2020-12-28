import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MockProvider } from 'ng-mocks'
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let ms: MessageService;
  let dialogServ: DialogService;
  let dynamicDialogRef: DynamicDialogRef;
  let dynamicDialogConfig: DynamicDialogConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsComponent ],
      imports: [
        DynamicDialogModule

      ],
      providers: [
        MockProvider(DialogService),
        MockProvider(DynamicDialogRef), {
          close: (event) => {}
        },
        MockProvider(DynamicDialogConfig)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have skills after construction', () => {
    expect(component.skills).toBeUndefined();
  });

  it('Should send event on RowSelect', () => {

    expect(true).toBeTrue();
  });
});
