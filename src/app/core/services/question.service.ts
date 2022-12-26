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

    getQuestions(paginateData: any) {
        const {
            rows,
            page,
            query,
        } = paginateData;

        return this.httpService.get({
            url: `${this.apiGatewayUrl}/api/v1/questions`,
            queryParams: {
                rows,
                page,
                query,
            },
        }); 
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

    getSuggestQuestions(query: string[]) {
        localStorage.setItem('query-temp', JSON.stringify(query));

        return this.httpService.get({
            url: `${this.apiGatewayUrl}/api/v1/questions`,
            queryParams: {
                q: query,
            },
        });
    }

    getBookmarkQuestions() {
        return this.httpService.get({
            url: `${this.apiGatewayUrl}/api/v1/bookmarks`,
        });
    }

    unBookmark(id: any) {
        return this.httpService.delete({
            url: `${this.apiGatewayUrl}/api/v1/bookmarks/${id}`,
        });
    }
}