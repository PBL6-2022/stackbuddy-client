import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
    private apiGatewayUrl = environment.apiGatewayUrl;
    
    constructor(
        private httpService: HttpService,
    ) {}

    createBookmark({
        question,
    }: {
        question: any,
    }) {
        const url: string = `${this.apiGatewayUrl}/api/v1/bookmarks`;

        return this.httpService.post({
            url,
            data: {
                question,
            },
        });
    }

    getBookmarks() {
        const url: string = `${this.apiGatewayUrl}/api/v1/bookmarks`;

        return this.httpService.get({ url });
    }
}
