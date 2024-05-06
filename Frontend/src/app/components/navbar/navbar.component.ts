import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users.model'
import { E } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router // Inject Router service here
  ) { }

  ngOnInit(): void {

    let localUser = localStorage.getItem("user")
    
    if(localUser != undefined){
      this.u = JSON.parse(localUser)
    }

  }
  isAdminUser(): boolean {
    return this.u !== undefined && this.u.role === 'admin';
  }
  
  
  u?: User = undefined
  showLogin = false
  showRegister = false

  toggleLoginForm(){
    if(this.showLogin == false && this.showRegister == true){
      this.showLogin = true
      this.showRegister = false
    }else{
      if(this.showLogin){
        this.showLogin = false
      }else{
        this.showLogin = true
      }
    }

  }

  toggleRegisterForm(){

    if(this.showLogin == true && this.showRegister == false){
      this.showLogin = false
      this.showRegister = true
    }else{
      if(this.showRegister){
        this.showRegister = false
      }else{
        this.showRegister = true
      }
    }
  }


  LogInForm = new FormGroup({

    username: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  })

  loginUser() {
    const username = this.LogInForm.value.username;
    const password = this.LogInForm.value.password;
  
    if (!this.LogInForm.valid) {
      console.log("Invalid form");
      return;
    }
  
    this.userService.loginUser(username, password).subscribe(user => {
      if (user == null) {
        alert("Neuspješna prijava! Neispravno korisničko ime ili lozinka.");
      } else {
        if (!user.active) {
          alert("Neuspješna prijava! Vaš račun je neaktivan.");
        } else {
          localStorage.setItem("user", JSON.stringify(user));
          alert("Prijava uspješna! Prijavljeni kao @" + user.username);
  
          if (user.role === 'admin') {
            this.router.navigateByUrl('/admin'); 
          } else {
            window.location.reload();
          }
        }
      }
    });
  }
  

    logoutUser() {
      localStorage.removeItem("user");
      window.location.reload();
    }

  RegisterForm = new FormGroup({

    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    usernameReg: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    passwordReg: new FormControl("", [Validators.required, Validators.minLength(8)]),
  })
    
  createUser() {
    if (!this.RegisterForm.valid) {
      return;
    }
  
    const firstName = this.RegisterForm.value.firstName;
    const lastName = this.RegisterForm.value.lastName;
    const usernameReg = this.RegisterForm.value.usernameReg;
    const passwordReg = this.RegisterForm.value.passwordReg;
  
    this.userService.create(firstName, lastName, usernameReg, passwordReg).subscribe(newUser => {
      // Nakon uspješne registracije, ažurirajte u varijablu kako biste prijavili korisnika
      this.u = newUser; // Postavite u na novoregistrovanog korisnika
      localStorage.setItem("user", JSON.stringify(newUser)); // Spremite korisnika u localStorage
      window.location.reload();
      // Opcionalno: Navigirajte korisnika na određenu stranicu nakon prijave
      this.router.navigateByUrl('/home');
    });
  }



}
