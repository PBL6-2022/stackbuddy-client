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

        // return this.httpService.get({ url: 'http://localhost:3000/assets/mock/question.json' });
        return this.httpService.get({ url: 'http://localhost:6969/api/v1/questions' }); 
    }

    wrapQuestionInfo({ indices, scores }: { indices: string[], scores: number[] }) {
        const questionData = indices.map(
            (id, index) => {
                return {
                    id,
                    questionUrl: `https://stackoverflow.com/questions/${id}`,
                    score: scores[index],
                };
            },
        );

        return questionData;
    }
}