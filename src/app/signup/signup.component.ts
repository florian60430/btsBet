import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../annonces/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserService } from '../annonces/services/user.service';
import { ParisService } from '../annonces/services/paris.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage!: string;


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private parisService: ParisService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signupForm.get('email')!.value;
    const password = this.signupForm.get('password')!.value;

    this.authService.createNewUser(email, password).then(
      () => {
        const user = firebase.auth().currentUser;
        if (user !== null) {
          this.userService.createUserBankroll(user.email!);
          this.userService.saveUserBankroll();
        }
        this.router.navigate(['/annonces']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}