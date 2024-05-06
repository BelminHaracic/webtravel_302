import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {Booking} from "src/app/models/bookings.model"

import { Observable } from 'rxjs';
@Injectable() export class BookingService {

    constructor(private http: HttpClient){}

    create(UserID:string,DestID:string, Start:string, End:string){
        return this.http.post<Booking>(environment.API_URL + "/bookings",{
            userID: UserID,
            destinationID: DestID,
            startDate: Start,
            endDate: End
        })
    }

    getAll(){
        return this.http.get<Booking[]>(environment.API_URL + "/bookings");
    }

    getByID(id:string){
        return this.http.get<Booking[]>(environment.API_URL + "/booking/?id=" + id);
    }

    remove(id:string){
        return this.http.delete<Booking>(environment.API_URL + "/booking/?id=" + id)
    }
    getBookingsByUsername(username: string): Observable<Booking[]> {
        return this.http.get<Booking[]>(`/api/bookings/user/${username}`);
      }
    update(id:string, UserID:string,DestID:string, Start:string, End:string){
        return this.http.put<Booking>(environment.API_URL + "/booking/?id="+ id, {
            userID: UserID,
            destinationID: DestID,
            startDate: Start,
            endDate: End
        })
    }

}
