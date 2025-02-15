// dashboard.component.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import DashboardComponent from './dashboard.component';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, HighlightDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with stats cards', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.statCards.length).toBeGreaterThan(0);
  }));

  it('should update stats periodically', fakeAsync(() => {
    component.ngOnInit();
    const updateCard = component.statCards.find(card => card.id === 2);
    const initialValue = Number(updateCard?.value || 0);

    tick(1000);
    fixture.detectChanges();

    const updatedCard = component.statCards.find(card => card.id === 2);
    const newValue = Number(updatedCard?.value || 0);

    expect(newValue).toBeGreaterThan(initialValue);
    tick();
  }));

  it('should toggle updates', fakeAsync(() => {
    component.ngOnInit();
    expect(component.isUpdating).toBeTrue();

    component.toggleUpdates();
    tick();
    expect(component.isUpdating).toBeFalse();

    component.toggleUpdates();
    tick();
    expect(component.isUpdating).toBeTrue();
  }));

  afterEach(fakeAsync(() => {
    component.ngOnDestroy();
    tick();
  }));
});
