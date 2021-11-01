import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnnonceService } from '../annonces/services/annonce.service';

@Component({
  selector: 'app-annonce-view',
  templateUrl: './annonce-view.component.html',
  styleUrls: ['./annonce-view.component.scss']
})
export class AnnonceViewComponent implements OnInit {

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  annonces!: any[];
  annonceSubscription!: Subscription;

  constructor(private annonceService: AnnonceService) {
    setTimeout(
      () => 
      {
        this.onFetch();
      }, 100
    );
  }

  ngOnInit() {
    this.annonceSubscription = this.annonceService.annonceSubject.subscribe(
      (annonces: any[]) => {
        this.annonces = annonces;
      }
    );
    this.annonceService.emitAnnonceSubject();
  }

  onTerminer() {
    this.annonceService.switchTerminerAll();

  }

  onEnCours() {
    this.annonceService.switchEnCoursALL();

  }

  onAvenir() {

    this.annonceService.switchAvenirALL();
  }

  onSave()
  {
    this.annonceService.saveAnnonceToServer();
  }

  onFetch() {
    this.annonceService.getAnnonceFromServer();
}


}

