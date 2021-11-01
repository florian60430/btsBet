import { Component, OnInit, Input } from '@angular/core';
import { AnnoncesComponent } from '../annonces/annonces.component';
import { AnnonceService } from '../annonces/services/annonce.service';
import { ParisService } from '../annonces/services/paris.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {
  @Input() annonceName! :string;
  @Input() annonceStatus! : string;
  @Input() annonceCote1! :number;
  @Input() annonceCote2! :number;
  @Input() indexOfAnnonce! : number;
  @Input() annonceId! : number;

  annonceIsOff!: boolean;

  constructor(private annonceService : AnnonceService, private parisService : ParisService) {}

  /* AddParisCoteOui(idParis : number, cote : number)
   {
     this.parisService.addParis(idParis, "oui", cote);
   }

   AddParisCoteNon(idParis : number,  cote : number)
   {
    this.parisService.addParis(idParis, "non", cote);
   }*/

  ngOnInit(): void {
  }

  addParisFini(idParis : number, resultat : string, cote: number )
  {
    this.annonceService.parisFini(idParis, resultat, cote);
    this.onSwitchTerminer();
    this.annonceService.saveAnnonceToServer();
  }

  getAnnonceStatus()
  {
    return this.annonceStatus;
  }

  onSwitchAvenir()
  {
    this.annonceService.switchAvenirOne(this.indexOfAnnonce);
    this.annonceIsOff = false;
  }

  onSwitchEnCours()
  {
    this.annonceService.switchEnCoursOne(this.indexOfAnnonce);
    this.annonceIsOff = false;
  }

  onSwitchTerminer()
  {
    this.annonceService.switchTerminerOne(this.indexOfAnnonce);
    this.annonceIsOff = true;
  }

  onDelete()
  {
    this.annonceService.onDeleteOne(this.indexOfAnnonce);
  }



}
