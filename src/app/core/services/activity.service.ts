import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { PrimeIcons } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ActivityLogService {
    private apiGatewayUrl = environment.apiGatewayUrl;
    
    constructor(
        private httpService: HttpService,
    ) {}

    
    Kind = {
        Login: 'login',
        Bookmark: 'bookmark',
        Search: 'search',   
    };

    StatusMapper = {
        [this.Kind.Login]: (_q: any) => 'You logged in',
        [this.Kind.Bookmark]: (q: any) => {
            return `You bookmark this question: ${q}`;
        },
        [this.Kind.Search]: (q: string) => {
            return `You search this: ${q}`;
        }
    };

    IconMapper = {
        [this.Kind.Login]: PrimeIcons.SIGN_IN,
        [this.Kind.Bookmark]: PrimeIcons.BOOKMARK,
    }

    buildFromRawData(data: any) {
        console.log(data);

        const wrapUpData = data.map((activityData: any) => {
            const { activity } = activityData;
            return {
                status: this.StatusMapper[activity.kind](
                    activity.kind === this.Kind.Search ? activity.query
                        : (activity.kind === this.Kind.Login ? '' : activity.question.question_url)
                ),
                date: (new Date(activityData.createdAt)).toLocaleString(),
                icon: this.IconMapper[activity.kind],
                data: activityData.data,
            };
        });

        console.log(wrapUpData);

        return wrapUpData;
    }

    getLogs() {
        const getUserLogsUrl = `${this.apiGatewayUrl}/api/v1/activities`;
        return this.httpService.get({ url: getUserLogsUrl })
            .pipe(map(
                response => {
                    const dataResponse = response as any;
                    return dataResponse && dataResponse.data;
                }
            ));
    }

}