import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { User } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  UserService: any;
  sortOrder: 'asc' | 'desc' = 'asc'; // Početni redoslijed sortiranja, po defaultu je 'asc'

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadDataUsers();
  }
  toggleActiveUser(user: User): void {
    const newActiveStatus = !user.active;

    this.userService.toggleActiveStatus(user._id, newActiveStatus).subscribe(
        (updatedUser: User) => {
            // Update the user in the local array
            const index = this.users.findIndex(u => u._id === updatedUser._id);
            if (index !== -1) {
                this.users[index] = updatedUser;
            }
        },
        (error) => {
            console.error('Failed to toggle user active status:', error);
        }
    );
}
  sortUsers(sortType: string) {
    switch (sortType) {
      case 'original':
         break;
      case 'alphabetical':
        this.users.sort((a, b) => a.username.localeCompare(b.username));
        break;
      case 'reverseAlphabetical':
        this.users.sort((a, b) => b.username.localeCompare(a.username));
        break;
      default:
        console.error('Nepoznat tip sortiranja:', sortType);
        break;
    }
  }
  // DESTINATIONS


  panelOpenState = false;

  @ViewChild('myaccordion')
  myPanels!: MatAccordion;

  openAll() {
    this.myPanels.openAll();
  }

  closeAll() {
    this.myPanels.closeAll();
  }
  loadDataUsers(){
    this.userService.getAll().subscribe(data => {
      if ("statusCode" in data) {
        this.users = [];
      } else {
        this.users = data;
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

    // USERS
    hidePass : boolean = true;
    isDisabled : boolean = true;
    users: User[] = [];
  
    usersForm = new FormGroup(
      {
        firstName: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        username: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
        password: new FormControl("", [Validators.required, Validators.minLength(8)])
  
      }
    );
  
    editFormUser = new FormGroup({
        firstName: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        username: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
  
      }
    );
  
    createUser() {
  
      if(!this.usersForm.valid){
        return;
      }
  
      let firstName = this.usersForm.value.firstName;
      let lastName = this.usersForm.value.lastName;
      let username = this.usersForm.value.username;
      let password = this.usersForm.value.password;
  
  
  
      this.userService.create(firstName, lastName, username, password).subscribe(u => {
        console.log(u)
        window.location.reload();
      })
  
  
  
    }
  
    editUser(id:string) {
  
      let fName = this.editFormUser.value.firstName;
      let lName = this.editFormUser.value.lastName;
      let Username = this.editFormUser.value.username;
  
  
      this.userService.update(id,fName, lName, Username).subscribe(u => {
        window.location.reload();
      })
  
  
      this.hideInput = this.hide;
      this.showInput = this.show;
    }
  
    deleteUser(id: string) {
  
      console.log(id)
  
      this.userService.remove(id).subscribe(d => {
        window.location.reload();
      })
    }
  
  
    checkStyle: string=""
  
    checkValid(){
  
      let username = this.usersForm.value.username;
      let password = this.usersForm.value.password;
  
      if((username.length>=5 && username.length<=20) && password.length>=8){
  
        console.log(true)
        this.isDisabled = false;
        this.checkStyle="background-color: green;"
  
      }else{
        this.checkStyle="background-color: red;"
        this.isDisabled = true;
      }
  
  
    }
  

}
