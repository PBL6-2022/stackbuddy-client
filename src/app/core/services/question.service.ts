import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import IPaginate from '../models/paginate';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class QuestionService {
    private apiGatewayUrl = environment.apiGatewayUrl;
    
    constructor(
        private httpService: HttpService,
    ) {}

    getQuestions(paginateData: IPaginate | null) {
        if (paginateData) {

        }

        return this.httpService.get({ url: 'http://localhost:4200/assets/mock/question.json' });
    }
}