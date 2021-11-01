import { Component, OnInit, Input} from '@angular/core';
import { AnnonceService } from './services/annonce.service';
import { ParisService } from './services/paris.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss']
})
export class AnnoncesComponent implements OnInit {

  @Input() annonceName! :string;
  @Input() annonceStatus! : string;
  @Input() annonceCote1! :number;
  @Input() annonceCote2! :number;
  @Input() indexOfAnnonce! : number;
  @Input() annonceId! : number;

  isAuth = false;
  isBankrupt = false;

  constructor(private annonceService : AnnonceService, private parisService : ParisService, private userService : UserService) {
  

    /*if (this.userService.user[0].credits <= 0)
    {
      this.isBankrupt == true;
    }*/

   }

   AddParisCoteOui(idParis : number,  cote : number, mise : number)
   {
    this.parisService.addParis(idParis, "oui", cote, mise);
    this.userService.user[0].credits -= 500;
    this.userService.saveUserBankroll();
   }

   AddParisCoteNon(idParis : number, cote : number, mise : number)
   {
    this.parisService.addParis(idParis, "non", cote, mise);
    this.userService.user[0].credits -= 500;
    this.userService.saveUserBankroll();
   }

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
  }

  onSwitchEnCours()
  {
    this.annonceService.switchEnCoursOne(this.indexOfAnnonce);
  }

  onSwitchTerminer()
  {
    this.annonceService.switchTerminerOne(this.indexOfAnnonce);
  }

  onDelete()
  {
    this.annonceService.onDeleteOne(this.indexOfAnnonce);
  }


}
