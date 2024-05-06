import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/bookings.model';
import { BookingService } from 'src/app/services/bookings.service';
import { UserService } from 'src/app/services/users.service'; // Import UserService

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})
export class UserBookingComponent implements OnInit {

  userBookings: Booking[] = [];
  currentUser: any;

  constructor(
    private userService: UserService, // Inject UserService
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser(); // Call function to get current user
  }

  getCurrentUser() {
    let localUser = localStorage.getItem("user");
    if (localUser != undefined) {
      this.currentUser = JSON.parse(localUser);
      this.loadUserBookings(this.currentUser._id);
    }
  }

  loadUserBookings(userId: string) {
    this.bookingService.getAll().subscribe((bookings: Booking[]) => {
      this.userBookings = bookings.filter(booking => booking.userID === userId);
    });
  }

  deleteBooking(id: string) {
    this.bookingService.remove(id).subscribe(() => {
      this.loadUserBookings(this.currentUser._id);
    });
  }
}
