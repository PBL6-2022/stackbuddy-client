import { C } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/component/base/base.component';
import IPaginate from 'src/app/core/models/paginate';
import { IQuestion } from 'src/app/core/models/question';
import { Severity } from 'src/app/core/models/severity';
import { BookmarkService } from 'src/app/core/services/bookmark.service';
import { QuestionService } from 'src/app/core/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent extends BaseComponent implements OnInit, OnDestroy {

  private getQuestionSubscription!: Subscription;
  private bookmarkSubscription!: Subscription;
  private getBookmarkSubscription!: Subscription;
  
  questionsData: IQuestion[] = [];
  itemPerPage = 5;
  currentPage = 0;
  bookmarkQuestions: any;
  questions: any;
  freqTags: any;
  query: any;

  constructor(
    private questionService: QuestionService,
    private bookmarkService: BookmarkService,
    messageService: MessageService,
  ) {
    super(messageService);
  }

  override ngOnInit(): void {
    const questionData = JSON.parse(localStorage.getItem('qs-data') || '{}');
    const query = JSON.parse(localStorage.getItem('query-temp') || '[]');
    const {
      posts,
      freqTags,
    } = questionData;

    this.questions = posts;
    this.freqTags = freqTags;
    this.query = query;
  }

  ngOnDestroy(): void {}

  getQuestions(paginateData: any) {
    let {
      page,
      rows,
    } = paginateData;

    page = page || 0;
    rows = rows || 10;

    const onNext = (data: any) => {
      const questionData = data?.data || null;
      const {
        posts,
        freqTags,
      } = questionData;

      this.questions = posts;
      this.freqTags = freqTags;

      this.toastr({
        severity: Severity.Success,
        summary: 'Get question success',
      });

      this.getQuestionSubscription.unsubscribe();
    }

    const onError = (_error: any) => {
      this.getQuestionSubscription.unsubscribe();
      this.toastr({
        severity: Severity.Error,
        summary: 'Cannot get question',
      })
    }

    this.getQuestionSubscription = this.questionService
      .getQuestions({
        rows,
        page,
        query: this.query,
      })
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

  getBookmark() {
    const onNextHandler: (data: any) => void = (data) => {
      console.log(data);
      this.getBookmarkSubscription.unsubscribe();
    };

    const onErrorHandler: (err: any) => void = (err) => {
      this.getBookmarkSubscription.unsubscribe();
    };

    this.getBookmarkSubscription = this.bookmarkService
      .getBookmarks()
      .subscribe({
        next: (data) => onNextHandler(data),
        error: (error) => onErrorHandler(error),
      });
  }

  fillBookmark() {

  }

  bookmark(question: any): void {
    const onNextHandler: (data: any) => void = (data) => {
      this.messageService.add({
        severity: Severity.Success,
        summary: 'Add bookmark success',
      });
      this.bookmarkSubscription.unsubscribe();
    };

    const onErrorHandler: (data: any) => void = (data) => {
      this.messageService.add({
        severity: Severity.Error,
        summary: 'Cannot add bookmark',
      });
      this.bookmarkSubscription.unsubscribe();
    }

    this.bookmarkSubscription = this.bookmarkService
      .createBookmark({ question })
      .subscribe({
        next: (data) => onNextHandler(data),
        error: (err) => onErrorHandler(err),
      });
  }
}
