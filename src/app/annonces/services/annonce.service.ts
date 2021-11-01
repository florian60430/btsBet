import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as firebase from "firebase";

@Injectable()

export class AnnonceService {

    annonceSubject = new Subject<any[]>();
    private annonces: {id: number, title: string, cote1: number, cote2: number, status: string}[] = [];
    /*private annonces = [{
        id : 0,
        title : "test",
        cote1 : 0,
        cote2: 0,
        status: "En cours"
    }];*/

    parisFinisSubject = new Subject<any[]>();
    //private annonces: {id: number, title: string, cote1: number, cote2: number, status: string}[] = [];

    private parisFinis = [{
        idParis : 0,
        resultat : "",
        cote : 0
    }];


    constructor(private httpClient: HttpClient) { }

    emitAnnonceSubject() {
        this.annonceSubject.next(this.annonces.slice());
    }

    emitParisFiniSubject() {
        this.parisFinisSubject.next(this.parisFinis.slice());
    }

    parisFini(idParis : number, resultat : string, cote : number)
    {
        const parisFinisObject = {
            idParis: 0,
            resultat: "",
            cote: 0,
        };
        parisFinisObject.idParis = idParis;
        parisFinisObject.resultat = resultat;
        parisFinisObject.cote = cote;

        this.parisFinis.push(parisFinisObject);
        this.emitParisFiniSubject();
        this.saveParisFini();
    }

    saveParisFini()
    {
        this.httpClient.put("https://http-client-test-a741d-default-rtdb.europe-west1.firebasedatabase.app/parisFini.json", this.parisFinis)
        .subscribe(
            () => {
                console.log('Enregistrement paris finis terminé !');
            },
            (error) => {
                console.log('Erreur ! : ' + error);
            }
        );

    }

    getAnnonceById(id: number) {
        const annonce = this.annonces.find(
            (annonceObjet) => {
                return annonceObjet.id === id;
            }
        );
        return annonce;
    }

    switchTerminerAll() {
        for (let annonces of this.annonces) {
            annonces.status = "Terminé";
        }

        this.emitAnnonceSubject();
    }

    switchEnCoursALL() {

        for (let annonces of this.annonces) {
            annonces.status = "En cours";
        }
        this.emitAnnonceSubject();
    }

    switchAvenirALL() {
        for (let annonces of this.annonces) {
            annonces.status = "A venir";
        }
        this.emitAnnonceSubject();
    }

    switchTerminerOne(index: number) {
        this.annonces[index].status = "Terminé";
        this.emitAnnonceSubject();
    }

    switchEnCoursOne(index: number) {
        this.annonces[index].status = "En cours";
        this.emitAnnonceSubject();
    }

    switchAvenirOne(index: number) {
        this.annonces[index].status = "A venir";
        this.emitAnnonceSubject();
    }

    onDeleteOne(index: number) {
        this.annonces.splice(index, 1);
        this.emitAnnonceSubject();
    }

    addAnnonce(name: string, cote1: number, cote2: number, status: string) {
        const annonceObjet = {
            id: 0,
            title: "",
            cote1: 0,
            cote2: 0,
            status: ""
        };
        annonceObjet.title = name;
        annonceObjet.cote1 = cote1;
        annonceObjet.cote2 = cote2;
        annonceObjet.status = status;
        //annonceObjet.id = this.annonces[(this.annonces.length - 1)].id + 1;
        annonceObjet.id = Date.now();
        this.annonces.push(annonceObjet);
        this.emitAnnonceSubject();
        this.saveAnnonceToServer();
    }

    saveAnnonceToServer() {

        //firebase.database().ref("/annonces").set(this.annonces);
        
        console.log(this.annonces);
        this.httpClient.put("https://http-client-test-a741d-default-rtdb.europe-west1.firebasedatabase.app/annonces.json", this.annonces)
            .subscribe(
                () => {
                    console.log('Enregistrement annonce terminé !');
                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );
    }


    getAnnonceFromServer() {

        this.httpClient
            .get<any[]>('https://http-client-test-a741d-default-rtdb.europe-west1.firebasedatabase.app/annonces.json')
            .subscribe(
                (response) => {
                    this.annonces = response;
                    console.log(response);
                    this.emitAnnonceSubject();
                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );
    }
}