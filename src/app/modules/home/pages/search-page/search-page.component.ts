import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, startWith, map, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/core/services/question.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  constructor(
    private questionService: QuestionService,
    private router: Router,
  ) {
    
  }

  control = new FormControl('');
  query: string = '';
  selectedHosptial: any;
  options: any;
  getQuestionSubscription!: Subscription;

  ngOnInit(): void {

  }


  findQuestions() {
    const onNextHandler: (data: any) => void = (data) => {
      localStorage.setItem('qs-data', JSON.stringify(data.data));
      this.getQuestionSubscription.unsubscribe();
      this.router.navigate(['/app/questions']);
    };

    const onErrorHandler: (err: any) => void = (err) => {
      this.getQuestionSubscription.unsubscribe();
    };

    if (this.query.length) {
      this.getQuestionSubscription = this.questionService.getSuggestQuestions([this.query]).subscribe({
        next: (data) => onNextHandler(data),
        error: (err) => onErrorHandler(err),
      });
    }
  }
}
