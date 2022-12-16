import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { HomeRoutingModule } from './home.routing';
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { OrderListModule } from 'primeng/orderlist';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { QuestionListComponent } from './pages/question-list/question-list.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [
    SearchPageComponent,
    ProfilePageComponent,
    BlogPageComponent,
    BookingPageComponent,
    QuestionListComponent,
    // For hashtag input
  ],
  imports: [
    SharedModule,
    RouterModule,
    HomeRoutingModule,
    MatIconModule,
    MatChipsModule,
    OrderListModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    DropdownModule,
    ChipsModule,
    AutoCompleteModule,
    RatingModule,
    InputTextareaModule,
    CalendarModule,
  ],
  exports: [],
  providers: [],
})
export class HomeModule {}
