import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerIssueService } from 'src/app/core/services/customer-issue.service';
import { IssueReplyService } from 'src/app/core/services/issue-reply.service';

@Component({
  selector: 'app-issue-reply',
  templateUrl: './issue-reply.component.html',
  styleUrls: ['./issue-reply.component.css']
})
export class IssueReplyComponent implements OnInit {

  issueId!: number;

  issue: any = {};

  replies: any[] = [];

  loading = false;

  replyRequest = {

    issueId: 0,

    replyMessage: ''

  };

  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private customerIssueService: CustomerIssueService,

    private issueReplyService: IssueReplyService

  ) { }

  ngOnInit(): void {

    this.issueId = Number(this.route.snapshot.paramMap.get('issueId'));

    this.replyRequest.issueId = this.issueId;

    this.loadIssue();

    this.loadReplies();

  }

  /**
   * Load Selected Issue
   */
  loadIssue(): void {

    this.loading = true;

    this.customerIssueService.getIssueById(this.issueId)

      .subscribe({

        next: (data: any) => {

          this.issue = data;

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  /**
   * Load Replies
   */
  loadReplies(): void {

    this.issueReplyService

      .getRepliesByIssue(this.issueId)

      .subscribe({

        next: (data: any) => {

          this.replies = data;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  /**
   * Send Reply
   */
  sendReply(): void {

    if (this.replyRequest.replyMessage.trim() === '') {

      alert('Please enter a reply.');

      return;

    }

    this.issueReplyService

      .createReply(this.replyRequest)

      .subscribe({

        next: () => {

          alert('Reply sent successfully.');

          this.replyRequest.replyMessage = '';

          this.loadReplies();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  /**
   * Go Back
   */
  goBack(): void {

    window.history.back();

  }

}