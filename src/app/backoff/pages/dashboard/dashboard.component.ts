// src/app/backoff/pages/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { UserService } from 'src/app/services/user.service';
import { chartOptions, parseOptions, chartExample1, chartExample2 } from '../../variables/charts';
import { AuthService } from '../../../services/auth.service'; // adapte le chemin si besoin
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

  loadUserStats(): void {
    this.userService.getUserStats().subscribe({
      next: (res) => {
        this.totalUsers = res.totalUsers;
        this.countBySexe = res.countBySexe || {};
        this.countByRole = res.countByRole || {};
      },
      error: (err) => {
        console.error("❌ Erreur API statistiques :", err);
      }
    });
  }
}
