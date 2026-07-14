import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerService } from 'src/app/core/services/customer.service';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

import { CustomerResponse } from 'src/app/model/customer-response';
import { CustomerRequest } from 'src/app/model/customer-request';

import { UserResponse } from 'src/app/model/user-response';
import { UserRequest } from 'src/app/model/user-request';

import { ChangePasswordRequest } from 'src/app/model/change-password-request';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  customerId!: number;
  userId!: number;

  customer: CustomerResponse = new CustomerResponse();

  user: UserResponse = {
    id: 0,
    fullName: '',
    username: '',
    email: '',
    phoneNumber: '',
    role: '',
    enabled: true
  };

  // ==========================
  // Profile Modal
  // ==========================

  showEditProfileModal = false;

  // ==========================
  // Address Modal
  // ==========================

  showEditAddressModal = false;

  // ==========================
  // Password Modal
  // ==========================

  showChangePasswordModal = false;

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private customerService: CustomerService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const id = localStorage.getItem('customerId');

    if (id) {

      this.customerId = Number(id);

      this.loadCustomer();

    } else {

      this.router.navigate(['/login']);

    }

  }

  // ==========================================
  // Load Customer
  // ==========================================

  loadCustomer(): void {

    this.customerService.getCustomerById(this.customerId)

      .subscribe({

        next: (response: CustomerResponse) => {

          this.customer = response;

          this.userId = response.userId;

          this.loadUser();

        },

        error: (err) => {

          console.log(err);

          alert("Unable to load customer profile.");

        }

      });

  }

  // ==========================================
  // Load User
  // ==========================================

  loadUser(): void {

    this.userService.getUserById(this.userId)

      .subscribe({

        next: (response: UserResponse) => {

          this.user = response;

        },

        error: (err) => {

          console.log(err);

          alert("Unable to load user details.");

        }

      });

  }

  // ==========================================
  // Profile Modal
  // ==========================================

  openEditProfile(): void {

    this.showEditProfileModal = true;

  }

  closeEditProfile(): void {

    this.showEditProfileModal = false;

  }

  // ==========================================
  // Address Modal
  // ==========================================

  openEditAddress(): void {

    this.showEditAddressModal = true;

  }

  closeEditAddress(): void {

    this.showEditAddressModal = false;

  }

  // ==========================================
  // Password Modal
  // ==========================================

  changePassword(): void {

    this.showChangePasswordModal = true;

  }

  closeChangePassword(): void {

    this.showChangePasswordModal = false;

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';

  }

  // ==========================================
  // Update Profile
  // ==========================================

  updateProfile(): void {

    const request: UserRequest = {

      fullName: this.user.fullName,

      username: this.user.username,

      email: this.user.email,

      phoneNumber: this.user.phoneNumber

    };

    this.userService.updateUser(this.userId, request)

      .subscribe({

        next: () => {

          alert("Profile Updated Successfully.");

          this.closeEditProfile();

          this.loadUser();

        },

        error: (err) => {

          console.log(err);

          alert("Unable to update profile.");

        }

      });

  }

  // ==========================================
  // Update Address
  // ==========================================

  updateAddress(): void {

    const request: CustomerRequest = {

      address: this.customer.address,

      city: this.customer.city,

      state: this.customer.state,

      pincode: this.customer.pincode,

      status: this.customer.status

    };

    this.customerService.updateCustomer(this.customerId, request)

      .subscribe({

        next: () => {

          alert("Address Updated Successfully.");

          this.closeEditAddress();

          this.loadCustomer();

        },

        error: (err) => {

          console.log(err);

          alert("Unable to update address.");

        }

      });

  }

  // ==========================================
  // Change Password
  // ==========================================

  savePassword(): void {

    if (
      this.currentPassword === '' ||
      this.newPassword === '' ||
      this.confirmPassword === ''
    ) {

      alert("Please fill all fields.");

      return;

    }

    if (this.newPassword !== this.confirmPassword) {

      alert("New Password and Confirm Password do not match.");

      return;

    }

    const request: ChangePasswordRequest = {

      username: this.user.username,

      currentPassword: this.currentPassword,

      newPassword: this.newPassword,

      confirmPassword: this.confirmPassword

    };

    this.authService.changePassword(request)

      .subscribe({

        next: () => {

          alert("Password Changed Successfully.");

          this.closeChangePassword();

        },

        error: (err) => {

          console.log(err);

          alert("Unable to change password.");

        }

      });

  }

  // ==========================================
  // Logout
  // ==========================================

  logout(): void {

    if (confirm("Are you sure you want to logout?")) {

      this.authService.logout().subscribe({

        next: () => {

          localStorage.clear();

          this.router.navigate(['/login']);

        },

        error: () => {

          localStorage.clear();

          this.router.navigate(['/login']);

        }

      });

    }

  }

}