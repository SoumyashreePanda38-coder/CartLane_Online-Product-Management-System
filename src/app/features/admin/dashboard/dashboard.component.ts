import { Component, OnInit } from '@angular/core';

import { AdminDashboardService } from 'src/app/core/services/admin-dashboard.service';
import { AdminDashboardResponse } from 'src/app/model/admin-dashboard-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard: AdminDashboardResponse = new AdminDashboardResponse();

  loading: boolean = false;

  constructor(
    private adminDashboardService: AdminDashboardService
  ) { }

  ngOnInit(): void {

    this.loadDashboard();

  }

  /**
   * Load Dashboard Data
   */
  loadDashboard(): void {

    this.loading = true;

    this.adminDashboardService.getDashboard().subscribe({

      next: (response: AdminDashboardResponse) => {

        this.dashboard = response;

        this.loading = false;

      },

      error: (error) => {

        console.error('Unable to load dashboard.', error);

        this.loading = false;

      }

    });

  }

}