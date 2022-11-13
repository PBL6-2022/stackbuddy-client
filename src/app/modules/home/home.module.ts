import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { DoctorAdviseComponent } from './pages/doctor-advise/doctor-advise.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { SurveyPageComponent } from './pages/survey-page/survey-page.component';
import { HomeRoutingModule } from './home.routing';
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    SearchPageComponent,
    ProfilePageComponent,
    DoctorAdviseComponent,
    BlogPageComponent,
    SurveyPageComponent,
    // For hashtag input
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    MatIconModule,
    MatChipsModule,
  ],
  exports: [],
  providers: [],
})
export class HomeModule {}
