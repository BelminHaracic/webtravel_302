import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { HomeComponent } from './pages/home/home.component';
import { SplineComponent } from './pages/home/spline/spline.component';
import { MainBannerComponent } from './pages/home/main-banner/main-banner.component';
import { MatIconModule } from "@angular/material/icon";
import { CarouselComponent } from './pages/home/carousel/carousel.component';
import { DestinationService } from './services/destinations.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToSComponent } from './pages/to-s/to-s.component';
import { AppRoutingModule } from './app.routing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StarRatingModule } from 'angular-star-rating';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChipComponent } from './components/chip/chip.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/users.service';
import { AdminDestComponent } from './pages/admin/admin-dest/AdminDestComponent';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';
import { AdminBookingComponent } from './pages/admin/admin-booking/admin-booking.component';
import { BookingService } from './services/bookings.service';
import { DiscoveryComponent } from './pages/discovery/discovery.component';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { SupportComponent } from './pages/support/support.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { UserBookingComponent } from './pages/home/user-booking/user-booking.component';
import { AdminCommentsComponent } from './pages/admin/admin-comments/admin-comments.component'; // Prilagodite putanju prema vašem projektu

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SplineComponent,
    MainBannerComponent,
    CarouselComponent,
    ToSComponent,
    ChipComponent,
    AdminComponent,
    CarouselComponent,
    AdminDestComponent,
    AdminUserComponent,
    AdminBookingComponent,
    DiscoveryComponent,
    SupportComponent,
    UserBookingComponent,
    AdminCommentsComponent,

  ],
  imports: [
    HttpClientModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule,
    StarRatingModule.forRoot(),
    MatChipsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  providers: [DestinationService, MatSnackBarModule, UserService, BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
