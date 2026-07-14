import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.service';

import { OrderResponse } from 'src/app/model/order-response';
import { ProductResponse } from 'src/app/model/product-response';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {


  customerName: string = "Customer";


  cartCount: number = 0;


  totalOrders: number = 0;


  activeOrders: number = 0;



  // Orders

  orders: OrderResponse[] = [];



  // Recommended Products

  products: ProductResponse[] = [];




  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router
  ){}





  ngOnInit(): void {


    const customerId =
      localStorage.getItem('customerId');



    const username =
      localStorage.getItem('username');



    if(username){

      this.customerName = username;

    }




    if(customerId){


      this.loadOrders(
        Number(customerId)
      );


    }
    else{


      this.router.navigate(['/login']);


    }



    this.loadProducts();


  }






  // ===============================
  // LOAD CUSTOMER ORDERS
  // ===============================


  loadOrders(customerId:number){


    this.orderService
    .getOrdersByCustomer(customerId)
    .subscribe({


      next:(data)=>{


        this.orders = data;



        this.totalOrders =
        this.orders.length;



        this.activeOrders =
        this.orders.filter(

          order =>
          order.status !== 'DELIVERED'

        ).length;



      },



      error:(err)=>{

        console.log(
          "Order Loading Error",
          err
        );

      }


    });


  }








  // ===============================
  // LOAD PRODUCTS
  // ===============================


  loadProducts(){


    this.productService
    .getAllProducts()
    .subscribe({


      next:(data)=>{


        // show only first 3 products

        this.products =
        data.slice(0,3);



      },


      error:(err)=>{


        console.log(
          "Product Loading Error",
          err
        );


      }



    });



  }



}