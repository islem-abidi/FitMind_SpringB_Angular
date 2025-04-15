// src/app/backoff/pages/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { UserService } from 'src/app/services/user.service';
import { chartOptions, parseOptions, chartExample1, chartExample2 } from '../../variables/charts';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public datasets: number[][] = [];
  public data: number[] = [];
  public salesChart: any;
  public clicked = true;
  public clicked1 = false;

  totalUsers: number = 0;
  countBySexe: { [key: string]: number } = {};
  countByRole: { [key: string]: number } = {};
  loginsPerDay: { [date: string]: number } = {};
  activeUsers: number = 0;
  inactiveUsers: number = 0;
  avgLastSeenDays: number = 0;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserStats();

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    parseOptions(Chart as any, chartOptions());

    const chartOrders = document.getElementById('chart-orders') as HTMLCanvasElement;
    if (chartOrders) {
      new (Chart as any)(chartOrders, {
        type: 'bar',
        options: chartExample2.options,
        data: chartExample2.data
      });
    }

    const chartSales = document.getElementById('chart-sales') as HTMLCanvasElement;
    if (chartSales) {
      this.salesChart = new (Chart as any)(chartSales, {
        type: 'line',
        options: chartExample1.options,
        data: chartExample1.data
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  updateOptions(): void {
    if (this.salesChart) {
      this.salesChart.data.datasets[0].data = this.data;
      this.salesChart.update();
    }
  }

  renderLoginChart(): void {
    const ctx = document.getElementById('chart-logins') as HTMLCanvasElement;
    if (!ctx || !this.loginsPerDay) return;

    const labels = Object.keys(this.loginsPerDay);
    const values = Object.values(this.loginsPerDay).map(v => Number(v));

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Connexions par jour',
          data: values,
          backgroundColor: '#5e72e4'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  renderActiveChart(): void {
    const ctx = document.getElementById('chart-activity') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Actifs (7j)', 'Inactifs'],
        datasets: [{
          data: [this.activeUsers, this.inactiveUsers],
          backgroundColor: ['#2dce89', '#f5365c']
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  loadUserStats(): void {
    this.userService.getUserStats().subscribe({
      next: (res) => {
        this.totalUsers = res.totalUsers;
        this.countBySexe = res.countBySexe || {};
        this.countByRole = res.countByRole || {};
        this.loginsPerDay = res.loginsPerDay || {};
        this.activeUsers = res.activeUsers;
        this.inactiveUsers = res.inactiveUsers;
        this.avgLastSeenDays = res.avgLastSeenDays || 0;

        this.renderLoginChart();
        this.renderActiveChart();
      },
      error: (err) => {
        console.error("❌ Erreur API statistiques :", err);
      }
    });
  }
  
}
