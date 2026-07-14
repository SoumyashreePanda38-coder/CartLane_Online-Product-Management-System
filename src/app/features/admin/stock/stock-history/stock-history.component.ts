import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StockService } from 'src/app/core/services/stock.service';
import { StockHistoryResponse } from 'src/app/model/stock-history-response';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.css']
})
export class StockHistoryComponent implements OnInit {

  id!: number;

  historyList: StockHistoryResponse[] = [];

  loading: boolean = false;

  constructor(
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (this.id) {
      this.loadHistory();
    }

  }

  /**
   * Load Stock History
   */
  loadHistory(): void {

    this.loading = true;

    this.stockService.getStockHistory(this.id).subscribe({

      next: (data) => {

        this.historyList = data;

        this.loading = false;

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

        alert('Unable to load stock history.');

      }

    });

  }

  /**
   * Back to Stock List
   */
  goBack(): void {

    this.router.navigate(['/admin/stocks']);

  }

}