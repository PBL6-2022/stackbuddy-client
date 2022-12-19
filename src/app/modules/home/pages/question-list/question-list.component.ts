import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/component/base/base.component';
import IPaginate from 'src/app/core/models/paginate';
import { IQuestion } from 'src/app/core/models/question';
import { Severity } from 'src/app/core/models/severity';
import { QuestionService } from 'src/app/core/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent extends BaseComponent implements OnInit {

  private getQuestionSubscription!: Subscription;
  
  questionsData: IQuestion[] = [];
  itemPerPage = 5;

  constructor(
    private questionService: QuestionService,
    messageService: MessageService,
  ) {
    super(messageService);
  }

  override ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(paginateData: IPaginate | null = null) {
    const onNext = (data: any) => {
      this.questionsData = data as Array<IQuestion>;
      this.questionsData = this.questionsData.slice(0, this.itemPerPage);
      this.toastr({
        severity: Severity.Success,
        summary: 'Success',
      });
      this.getQuestionSubscription.unsubscribe();
    }

    const onError = (error: any) => {
      this.getQuestionSubscription.unsubscribe();
      this.toastr({
        severity: Severity.Error,
        summary: 'Error',
      })
    }

    this.getQuestionSubscription = this.questionService
      .getQuestions(paginateData ? paginateData as IPaginate : null)
      .subscribe({
        next: (data) => onNext(data),
        error: (error) => onError(error), 
      });
  }

  paginate(event: any) {
    const {
      page,
      first,
      rows,
    } = event;

    this.getQuestions({
      page,
      first,
      rows,
    });
  }

}
