import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../models/users.model";
import { Observable } from 'rxjs';

@Injectable() export class UserService {
    toggleActiveStatus(id: string, isActive: boolean): Observable<any> {
        return this.http.put<any>(`${environment.API_URL}/user/toggleActive?id=${id}`, { isActive });
    }
    constructor(private http: HttpClient){}

    create(fName:string,lName:string, Username:string, Password:string){
        return this.http.post<User>(environment.API_URL + "/users",{
            firstName: fName,
            lastName: lName,
            username: Username,
            password: Password
        })
    }

    getAll(){
        return this.http.get<User[]>(environment.API_URL + "/users");
    }

    getByID(id:string){
        return this.http.get<User[]>(environment.API_URL + "/user/?id=" + id);
    }

    remove(id:string){
        return this.http.delete<User>(environment.API_URL + "/user/?id=" + id)
    }

    update(id:string, fName:string,lName:string, Username:string){
        return this.http.put<User>(environment.API_URL + "/user/?id="+ id, {
            firstName: fName,
            lastName: lName,
            username: Username
        })
    }

    loginUser(username: string, password: string) {
        return this.http.post<User>(environment.API_URL + "/user/login", {
            username: username,
            password: password
        });
    }

    

}
