import { Component, OnInit, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { ParisService } from '../annonces/services/paris.service';

@Component({
  selector: 'app-paris-list',
  templateUrl: './paris-list.component.html',
  styleUrls: ['./paris-list.component.scss']
})
export class ParisListComponent implements OnInit {

  parisList: {idParis: number, idAnnonce: number, cote: number, reponse: string} [] = [];
  parisListSubscription!: Subscription;
  /*parisList = [
    {
      idParis : 12354964,
      idUser: "floflobg1999",
      cote : 5.25

    },
    {
      idParis : 666666,
      idUser: "user27",
      cote : 1.01

    },  
    {
      idParis : 7777777,
      idUser: "richar25",
      cote :52

    }
  ];*/

  constructor(private parisService : ParisService) {

    setTimeout(
      () => 
      {
        this.parisService.getParisFromServer();
      }, 100
    );
    this.parisList = this.parisService.paris;
   }

  ngOnInit(): void {

    this.parisListSubscription = this.parisService.parisSubject.subscribe(
      (parisList: any[]) => {
        this.parisList = parisList;
      }
    );
    //this.annonceService.emitAnnonceSubject();
  }

}
