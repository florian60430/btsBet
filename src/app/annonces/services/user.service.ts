import { User } from "src/app/models/User.model";
import { Subject } from "rxjs";
import * as firebase from "firebase";
import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()

export class UserService  {

  /*user: User[] = [
      {
          idUser: "",
          email: "",
          credits : 100

      }
  ];*/
  user: { idUser: string, email: string, credits: number }[] = [];
  //userBankroll : {credits : number, email : string} [] = [];
  userSubject = new Subject<User[]>();
  credits!: number;

  constructor(private httpClient: HttpClient) {
    /*  if (this.user[0].credits <= 0)
      {
        this.user[0].credits = 0;

      }*/
    this.getUserBankroll();

//    console.log(this.user[0].credits);
  }

  ngOninit() : void{

    if (this.user[0].credits <= 0) {
      this.user[0].credits = 0;

    }
  }

    emitUsers() {
      if (this.user != null) {
        this.userSubject.next(this.user.slice());
      }
    }


    addUser(user: User) {
      this.user.push(user);
      // this.emitUsers();
    }


    createUserBankroll(emailUser : string)
    {
      this.user[0].email = emailUser;
      this.user[0].credits = 5000;
    }

    saveUserBankroll()
    {
      const user = firebase.auth().currentUser;
      this.httpClient.put("https://http-client-test-a741d-default-rtdb.europe-west1.firebasedatabase.app/usersBankroll/" + user!.uid + ".json", this.user)
        .subscribe(
          () => {
            console.log('Enregistrement bankroll user terminé !');
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
    }

    getUserBankroll()
    {
      const user = firebase.auth().currentUser;
      console.log(user!.uid);

      this.httpClient
        .get<any>("https://http-client-test-a741d-default-rtdb.europe-west1.firebasedatabase.app/usersBankroll/" + user!.uid + ".json")
        .subscribe(
          (response) => {
            if (this.user[0].credits <= 0)
            {
              this.user = response;
              this.user[0].credits = 0;
            }
            else
            {
              this.user = response;
            }
            console.log(this.user);
            //this.emitUsers();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
    }

    fetchProfil()
    {
      this.httpClient
        .get<any[]>('https://http-client-test-a741d-default-rtdb.europe-west1.firebasedatabase.app/parisUsers.json')
        .subscribe(
          (response) => {
            this.user = response;
            //  this.emitUsers();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
    }
  }