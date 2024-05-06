import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Destination } from "../models/destinations.model";
import { Observable } from 'rxjs';
import { Comment } from '../models/destinations.model';

@Injectable() export class DestinationService {
    private apiUrl = 'http://localhost:3000'; 
    constructor(private http: HttpClient){}

    create(city: string, country: string, description: string, review: number, imageURL: string, continent: string, categories:string[]): Observable<Destination> {
        return this.http.post<Destination>(`${environment.API_URL}/destinations`, {
            city,
            country,
            description,
            review,
            imageURL,
            continent,
            categories
        });
    }

    getAll(){
        return this.http.get<Destination[]>(environment.API_URL + "/destinations");
    }

    getByID(id:string){
        return this.http.get<Destination[]>(environment.API_URL + "/destination/?id=" + id);
    }

    remove(id:string){
        return this.http.delete<Destination>(environment.API_URL + "/destination/?id=" + id)
    }

    update(id: string, city: string, country: string, description: string, review: string, continent: string): Observable<any> {
        const dataForUpdate = {
            city,
            country,
            description,
            review,
            continent  // Uključujemo samo kontinent
        };

        return this.http.put<any>(`${this.apiUrl}/destination?id=${id}`, dataForUpdate);
    }
    getAllComments(): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${environment.API_URL}/comments`);
    }
    // Metoda za dohvaćanje svih destinacija s pripadajućim komentarima
    getAllWithComments(): Observable<Destination[]> {
        return this.http.get<Destination[]>(`${environment.API_URL}/destinations?_embed=comments`);
    }

    // Metoda za brisanje komentara po ID-u
    deleteComment(comment: Comment): Observable<any> {
        return this.http.delete<any>(`${environment.API_URL}/comments/${comment._id}`);
      }
      
      
      
}