import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Severity } from 'src/app/core/models/severity';
import { QuestionService } from 'src/app/core/services/question.service';

@Component({
  selector: 'app-bookmark-page',
  templateUrl: './bookmark-page.component.html',
  styleUrls: ['./bookmark-page.component.scss']
})
export class BookmarkPageComponent implements OnInit {

  getBookmarkSubscription!: Subscription;
  deleteBookmarkSubscription!: Subscription;
  questions: any;

  constructor(
    private questionService: QuestionService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getBookmark();
  }
  
  getBookmark() {
    const onNextHandler: (data: any) => void = (data) => {
      this.questions = data.data;
      console.log(this.questions);
      this.messageService.add({
        severity: Severity.Success,
        summary: 'Get bookmark success',
      });
      this.getBookmarkSubscription.unsubscribe();
    };

    const onErrorHandler: (data: any) => void = (data) => {
      this.messageService.add({
        severity: Severity.Error,
        summary: 'Cannot get bookmarks',
      });
      this.getBookmarkSubscription.unsubscribe();
    }

    this.getBookmarkSubscription = this.questionService
      .getBookmarkQuestions()
      .subscribe({
        next: (data) => onNextHandler(data),
        error: (err) => onErrorHandler(err),
      });
  }

  unBookmark(question: any) {
    const onNextHandler: (data: any) => void = (data) => {
      this.questions = data.data;
      console.log(this.questions);
      this.messageService.add({
        severity: Severity.Success,
        summary: 'Delete bookmark success',
      });
      this.deleteBookmarkSubscription.unsubscribe();
      this.getBookmark();
    };

    const onErrorHandler: (data: any) => void = (data) => {
      this.messageService.add({
        severity: Severity.Error,
        summary: 'Cannot delete bookmarks',
      });
      this.deleteBookmarkSubscription.unsubscribe();
    }

    this.deleteBookmarkSubscription = this.questionService.unBookmark(question)
      .subscribe({
        next: (data) => onNextHandler(data),
        error: (error) => onErrorHandler(error),
      });
  }
}
