import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StockService } from 'src/app/core/services/stock.service';
import { StockRequest } from 'src/app/model/stock-request';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  stockId!: number;

  isEditMode: boolean = false;

  stockRequest: StockRequest = {

    id: 0,

    quantity: 0,

    action: 'STOCK_IN'

  };

  constructor(
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('stockId');

    if (id) {

      this.isEditMode = true;

      this.stockId = Number(id);

      this.loadStock();

    }

  }

  /**
   * Load Stock for Edit
   */
  loadStock(): void {

    this.stockService.getStockById(this.stockId).subscribe({

      next: (response) => {

        this.stockRequest = {

          id: response.id,

          quantity: response.quantity,

          action: 'UPDATE'

        };

      },

      error: (error) => {

        console.error(error);

        alert('Unable to load stock.');

      }

    });

  }

  /**
   * Save Stock
   */
  saveStock(): void {

    if (this.isEditMode) {

      this.stockService.updateStock(
        this.stockId,
        this.stockRequest
      ).subscribe({

        next: () => {

          alert('Stock updated successfully.');

          this.router.navigate(['/admin/stocks']);

        },

        error: (error) => {

          console.error(error);

          alert('Unable to update stock.');

        }

      });

    } else {

      this.stockService.addStock(
        this.stockRequest
      ).subscribe({

        next: () => {

          alert('Stock added successfully.');

          this.router.navigate(['/admin/stocks']);

        },

        error: (error) => {

          console.error(error);

          alert('Unable to add stock.');

        }

      });

    }

  }

  /**
   * Cancel
   */
  goBack(): void {

    this.router.navigate(['/admin/stocks']);

  }

}