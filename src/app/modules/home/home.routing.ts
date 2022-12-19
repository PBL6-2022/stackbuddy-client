import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkPageComponent } from './pages/bookmark-page/bookmark-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';


const routesConfiguration: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/search',
  },
  {
    path: '',
    children: [
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
      {
        path: 'questions',
        component: QuestionListComponent,
      },
      {
        path: 'logging',
        component: HistoryPageComponent,
      },
      {
        path: 'bookmark',
        component: BookmarkPageComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesConfiguration)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
