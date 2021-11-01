import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnnonceService } from './annonces/services/annonce.service';
import { Observable, Subscription } from 'rxjs-compat';
import "rxjs/Rx";
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  secondes!: number;
  counterSubscription! : Subscription;

  
  title = 'BtsBET';

  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyConYOumdm_YqOxyjjODxDJik2TeA9Bq2U",
      authDomain: "http-client-test-a741d.firebaseapp.com",
      databaseURL: "https://http-client-test-a741d-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "http-client-test-a741d",
      storageBucket: "http-client-test-a741d.appspot.com",
      messagingSenderId: "658171316476",
      appId: "1:658171316476:web:3376297378cae97ea26f79"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  }

  ngOnInit() {
    const counter = Observable.interval(1000);
   this.counterSubscription = counter.subscribe();
   (value : number) => {
     this.secondes = value;
   }
  }

  ngOnDestroy()
  {
    this.counterSubscription.unsubscribe();
  }

}
