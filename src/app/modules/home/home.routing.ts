import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
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
        path: 'blogs',
        component: BlogPageComponent,
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
        path: 'booking',
        component: BookingPageComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesConfiguration)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
