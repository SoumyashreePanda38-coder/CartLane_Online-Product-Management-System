export class AdminDashboardResponse {

  totalProducts!: number;

  totalCustomers!: number;

  totalOrders!: number;

  totalRevenue!: number;

  constructor(
    totalProducts: number = 0,
    totalCustomers: number = 0,
    totalOrders: number = 0,
    totalRevenue: number = 0
  ) {
    this.totalProducts = totalProducts;
    this.totalCustomers = totalCustomers;
    this.totalOrders = totalOrders;
    this.totalRevenue = totalRevenue;
  }

}