import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';import { CommonModule } from '@angular/common';
import { Subject, interval } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';

interface StatCard {
  id: number;
  title: string;
  value: number | string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,  // Performance optimization
  template: `
    <div class="dashboard">
      <h2>Dashboard Statistics</h2>
      <div class="stats">
        <div *ngFor="let card of statCards; trackBy: trackByFn"
             class="stat-card"
             [appHighlight]="card.color">
          <h3>{{ card.title }}</h3>
          <p>{{ card.value }}</p>
        </div>
      </div>
      <button (click)="toggleUpdates()">
        {{ isUpdating ? 'Stop' : 'Start' }} Live Updates
      </button>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
    }
    .stats {
      display: flex;
      gap: 2rem;
      margin: 2rem 0;
      flex-wrap: wrap;
    }
    .stat-card {
      padding: 1.5rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      min-width: 200px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .stat-card h3 {
      margin: 0;
      color: #666;
      font-size: 1rem;
    }
    .stat-card p {
      margin: 0.5rem 0 0;
      font-size: 2rem;
      font-weight: bold;
      color: #007bff;
    }
    button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  `]
})
export default class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private updateInterval$ = interval(1000);
  isUpdating = false;
  statCards: StatCard[] = [];

  ngOnInit() {
    this.initializeStats();
    this.startUpdates();
  }

  initializeStats() {
    this.statCards = [
      { id: 1, title: 'Active Users', value: Math.floor(Math.random() * 5) + 1, color: '#e6f3ff' },
      { id: 2, title: 'Update Count', value: 0, color: '#e6ffe6' },
      { id: 3, title: 'Performance Score', value: '95%', color: '#ffe6e6' }
    ];
  }

  trackByFn(index: number, item: StatCard): number {
    return item.id;  // Performance optimization for ngFor
  }

  startUpdates() {
    this.isUpdating = true;
    this.updateInterval$
      .pipe(
        takeUntil(this.destroy$),
        map(val => val + 1)
      )
      .subscribe(count => {
        this.updateStats(count);
      });
  }

  updateStats(count: number) {
    this.statCards = this.statCards.map(card => {
      if (card.id === 1) {
        return { ...card, value: Math.max(1, Math.min(5, card.value as number + (Math.random() > 0.7 ? Math.random() > 0.5 ? 1 : -1 : 0))) };
      }
      if (card.id === 2) {
        return { ...card, value: count };
      }
      return card;
    });
  }

  toggleUpdates() {
    if (this.isUpdating) {
      this.destroy$.next();
      this.isUpdating = false;
    } else {
      this.startUpdates();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
