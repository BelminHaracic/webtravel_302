import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Booking } from 'src/app/models/bookings.model';
import { User } from 'src/app/models/users.model';
import { BookingService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.css']
})
export class AdminBookingComponent implements OnInit {

  BookingService: any;

  constructor(
    private bookingService: BookingService,
  ) { }

  u?: User = undefined  
  userID = ""

  ngOnInit(): void {

    this.loadDataBookings();

    let localUser = localStorage.getItem("user")
    
    if(localUser != undefined){
      this.u = JSON.parse(localUser)

    }

    this.checkUID();
  }

  checkUID(){
    if(this.u!=undefined){
      this.userID = this.u._id;
    
    }else{
      this.userID = "ERROR LOADING USER ID."
    }
  }


  panelOpenState = false;

  @ViewChild('myaccordion')
  myPanels!: MatAccordion;

  openAll() {
    this.myPanels.openAll();
  }

  closeAll() {
    this.myPanels.closeAll();
  }
  loadDataBookings(){
    this.bookingService.getAll().subscribe(all => {
      if ("statusCode" in all) {
        this.bookings = [];
      } else {
        this.bookings = all;
      }
    })
  }

  hideInput: string = "display: none;"
  showInput: string = "display: block"
  hide: string = "display: none;"
  show: string = "display: block"


  editEvent(option:boolean) {

    if(option){
      this.hideInput = this.show;
      this.showInput = this.hide;
    }else{
      this.hideInput = this.hide;
      this.showInput = this.show;
    }

  }

  bookings: Booking[] = [];

  deleteBooking(id: string) {
  
    console.log(id)

    this.bookingService.remove(id).subscribe(d => {
      window.location.reload();
    })
  }
}
