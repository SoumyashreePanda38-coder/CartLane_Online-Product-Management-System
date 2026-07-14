import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerIssueService } from 'src/app/core/services/customer-issue.service';

@Component({
  selector: 'app-customer-issues',
  templateUrl: './customer-issues.component.html',
  styleUrls: ['./customer-issues.component.css']
})
export class CustomerIssuesComponent implements OnInit {

  customerId!: number;

  issues: any[] = [];

  loading: boolean = false;

  constructor(
    private customerIssueService: CustomerIssueService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.customerId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadCustomerIssues();

  }

  /**
   * Load all issues of the selected customer
   */
  loadCustomerIssues(): void {

    this.loading = true;

    this.customerIssueService.getIssuesByCustomer(this.customerId)
      .subscribe({

        next: (data: any) => {

          this.issues = data;

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  /**
   * Reply to Issue
   */
  replyIssue(issueId: number): void {

    this.router.navigate([
      '/admin/customers/issue',
      issueId,
      'reply'
    ]);

  }

  /**
   * Go Back
   */
  goBack(): void {

    this.router.navigate([
      '/admin/customers/view',
      this.customerId
    ]);

  }

}