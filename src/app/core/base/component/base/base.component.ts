import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Severity } from 'src/app/core/models/severity';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(
    protected messageService: MessageService,
  ) {

  }

  toastr({
    severity,
    summary,
    detail,
    options,
  }: {
    severity: Severity,
    summary: string,
    detail?: string,
    options?: any,
  }): void {
    this.messageService.add({
      ...options,
      severity,
      summary,
      detail,
    });
  }

  ngOnInit(): void {}

}
