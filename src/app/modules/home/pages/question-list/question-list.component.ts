import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/component/base/base.component';
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

  constructor(
    private questionSerivce: QuestionService,
    messageService: MessageService,
  ) {
    super(messageService);
  }

  override ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    const onNext = (data: any) => {
      this.questionsData = data as Array<IQuestion>;
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

    this.getQuestionSubscription = this.questionSerivce
      .getQuestions()
      .subscribe({
        next: (data) => onNext(data),
        error: (error) => onError(error), 
      });
  }

}
