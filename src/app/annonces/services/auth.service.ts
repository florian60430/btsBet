import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { ParisService } from "./paris.service";

@Injectable()

export class AuthService {

  uidUser!: string;
  emailUser!: string;
  isAuth = false;

  constructor() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const user = firebase.auth().currentUser;
        
        if (user !== null) {
          this.emailUser = user.email!;
        }
      } else {
        // User is signed out
        // ...
      }
    });
  }

  createNewUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {

            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );

  }
  signInUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
            this.emailUser = email;

          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

  getUidUser() {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      this.uidUser = user.uid
    } else {
      this.uidUser = "0";
    }
  }




}