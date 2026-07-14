import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

 searchValue:string='';
 






  constructor(
    private router: Router,
    private authService: AuthService,
    private searchService:SearchService
){}
 




  // Product search

  searchProducts() {

  if (!this.searchValue.trim()) {
    return;
  }

  this.searchService.setSearchText(this.searchValue);

  this.router.navigate(['/customer/products']);

}



      // Later:
      // this.router.navigate(
      // ['/customer/products'],
      // {queryParams:{search:this.searchText}}
      // );

    

  





  // Navigate to profile

  openProfile() {

    this.router.navigate([
      '/customer/profile'
    ]);

  }





  // Logout

  logout() {


    this.authService.logout()
    .subscribe({

      next:(response)=>{


        console.log(response);


        localStorage.clear();


        this.router.navigate([
          '/login'
        ]);


      },


      error:(error)=>{


        console.log(
          "Logout error",
          error
        );


        localStorage.clear();


        this.router.navigate([
          '/login'
        ]);


      }

    });


  }



}