import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnnonceService } from '../annonces/services/annonce.service';

@Component({
  selector: 'app-gestion-view',
  templateUrl: './gestion-view.component.html',
  styleUrls: ['./gestion-view.component.scss']
})

export class GestionViewComponent implements OnInit {


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

  }

  ngOnInit() {

    this.onFetch();
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

  onSave() {
    this.annonceService.saveAnnonceToServer();
  }

  onFetch() {
    this.annonceService.getAnnonceFromServer();
  }
}
