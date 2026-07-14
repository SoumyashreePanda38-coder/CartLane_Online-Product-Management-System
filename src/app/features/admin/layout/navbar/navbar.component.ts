import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

import { NotificationResponse } from 'src/app/model/notification-response';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  notifications: NotificationResponse[] = [];

  unreadCount = 0;
  today: Date = new Date();

  showNotifications = false;

  loading = false;
  adminName: string = '';

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) { }

 ngOnInit(): void {

  this.adminName =
    localStorage.getItem('username') || 'Administrator';

  this.today = new Date();

  this.loadNotifications();

}
  /**
   * Load Notifications
   */
  loadNotifications(): void {

    this.loading = true;

    this.notificationService
      .getAllNotifications()
      .subscribe({

        next: (response) => {

          this.notifications = response.sort((a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );

          this.unreadCount = this.notifications.filter(
            notification => !notification.isRead
          ).length;

          this.loading = false;

        },

        error: (err) => {

          console.log(err);

          this.loading = false;

        }

      });

  }

  /**
   * Show Notification Dropdown
   */
  toggleNotifications(): void {

    this.showNotifications = !this.showNotifications;

  }

  /**
   * Mark Notification As Read
   */
  markAsRead(notification: NotificationResponse): void {

    if (notification.isRead) {

      return;

    }

    this.notificationService
      .markAsRead(notification.notificationId)
      .subscribe({

        next: () => {

          notification.isRead = true;

          this.unreadCount--;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  openNotification(notification: NotificationResponse): void {

  this.markAsRead(notification);

  if (notification.type === 'ORDER') {

    this.router.navigate([
      '/admin/orders/details',
      notification.referenceId
    ]);

  }

}

}