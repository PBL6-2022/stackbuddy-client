import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { DoctorAdviseComponent } from './pages/doctor-advise/doctor-advise.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SurveyPageComponent } from './pages/survey-page/survey-page.component';


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
        path: 'advise',
        component: DoctorAdviseComponent,
      },
      {
        path: 'blogs',
        component: BlogPageComponent,
      },
      {
        path: 'survey',
        component: SurveyPageComponent,
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
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
