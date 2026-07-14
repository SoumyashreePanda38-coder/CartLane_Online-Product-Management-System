import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StockService } from 'src/app/core/services/stock.service';
import { StockResponse } from 'src/app/model/stock-response';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stocks: StockResponse[] = [];

  loading: boolean = false;

  constructor(
    private stockService: StockService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStocks();
  }

  /**
   * Load All Stocks
   */
  loadStocks(): void {

    this.loading = true;

    this.stockService.getAllStocks().subscribe({

      next: (data) => {

        this.stocks = data;
        this.loading = false;

      },

      error: (error) => {

        console.error('Error loading stocks', error);
        this.loading = false;

      }

    });

  }

  /**
   * Delete Stock
   */
  deleteStock(stockId: number): void {

    if (!confirm('Are you sure you want to delete this stock?')) {
      return;
    }

    this.stockService.deleteStock(stockId).subscribe({

      next: () => {

        alert('Stock deleted successfully.');

        this.loadStocks();

      },

      error: (error) => {

        console.error(error);

        alert('Unable to delete stock.');

      }

    });

  }

}