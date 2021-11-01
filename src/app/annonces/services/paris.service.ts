import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { Paris } from "src/app/models/Paris.models";
import * as firebase from 'firebase';

@Injectable()

export class ParisService {

  userUid!: string;
  parisSubject = new Subject<any[]>();

  signleParis = <Paris>{};
  paris: { idParis: number, idAnnonce: number, reponse: string, cote: number, mise : number }[] = [];

  /*  paris = [
      {
      idParis : Date.now(),
      idAnnonce: 1,
      reponse: "oui",
      cote: 2.25
      },

  ];*/



  constructor(private httpClient: HttpClient, private userService: UserService) { 

    this.getParisFromServer();
  }

  emitParisSubject() {
    if (this.paris != null) {
      this.parisSubject.next(this.paris.slice());
    }
  }

  addParis(idAnnonce: number, reponse: string, coteParis: number, mise : number) {

    if (this.paris == null)
    {
      this.paris = [];
    }

    const parisObjet = {
      idParis: 0,
      idAnnonce: 0,
      reponse: "",
      cote: 0,
      mise : 0
    };
    parisObjet.idParis = Date.now();
    parisObjet.idAnnonce = idAnnonce;
    parisObjet.reponse = reponse;
    parisObjet.cote = coteParis;
    parisObjet.mise = mise;

    this.paris.push(parisObjet);
    //this.emitAnnonceSubject();


    /*  this.signleParis.idAnnonce = idAnnonce;
      this.signleParis.idUser = this.authService.emailUser;
      this.signleParis.cote = coteParis;*/
    this.saveParisToServer();
  }

  saveParisToServer() {



    const user = firebase.auth().currentUser;
    console.log(this.paris);


    this.httpClient.put("https://http-client-test-a741d-default-rtdb.europe-west1.firebasedatabase.app/parisUsers/" + user!.uid + ".json", this.paris)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }


  getParisFromServer() {

    const user = firebase.auth().currentUser;

    this.httpClient
      .get<any[]>("https://http-client-test-a741d-default-rtdb.europe-west1.firebasedatabase.app/parisUsers/" + user!.uid + ".json")
      .subscribe(
        (response) => {
          //if (response != null) {
          this.paris = response;
          this.emitParisSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}