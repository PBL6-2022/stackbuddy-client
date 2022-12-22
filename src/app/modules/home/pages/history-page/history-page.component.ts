import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeIcons } from 'primeng/api';

import { ActivityLogService } from 'src/app/core/services/activity.service';
import ActivityLog from 'src/app/core/models/activity';
import { Subscription } from 'rxjs';
import { Severity } from 'src/app/core/models/severity';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  events1!: any[];
  activities: any;
  eventLogger: Array<ActivityLog> = [];
  getActivityLogSubscription!: Subscription;

  constructor(
    private messageService: MessageService,
    private activityLogService: ActivityLogService,
  ) { }

  ngOnInit(): void {
    this.events1 = [
      {
        status: "Search",
        date: "15/10/2020 10:30",
        icon: PrimeIcons.SEARCH,
      },
      {
        status: "Edit profile",
        date: "15/10/2020 14:00",
        icon: PrimeIcons.USER_EDIT,
      },
      {
        status: "Bookmark",
        date: "15/10/2020 16:15",
        icon: PrimeIcons.BOOKMARK,
      },
      {
        status: "Search",
        date: "15/10/2020 16:15",
        icon: PrimeIcons.SEARCH,
      },
    ];

    this.getActivityLog();
  }

  getActivityLog() {
    const onNextHandler: (data: any) => void = (data) => {
      console.log(data);
      this.activities = this.activityLogService.buildFromRawData(data);
      this.messageService.add({
        severity: Severity.Success,
        summary: 'Get log success',
      });
      console.log({ activities: this.activities })
      this.getActivityLogSubscription.unsubscribe();
    };

    const onErrorHandler: (data: any) => void = (data) => {
      this.messageService.add({
        severity: Severity.Error,
        summary: 'Cannot get activity logs',
      });
      this.getActivityLogSubscription.unsubscribe();
    }

    this.getActivityLogSubscription = this.activityLogService
      .getLogs()
      .subscribe({
        next: (data) => onNextHandler(data),
        error: (error) => onErrorHandler(error),
      });
  }
}
