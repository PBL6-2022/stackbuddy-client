import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeIcons } from 'primeng/api';

import { ActivityLogService } from 'src/app/core/services/activity.service';
import ActivityLog from 'src/app/core/models/activity';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  events1!: any[];

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
  }

  getActivityLog() {
    this.getActivityLogSubscription = this.activityLogService
      .getLogs()
      .subscribe();
  }
}
