import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../annonces/services/annonce.service';

@Component({
  selector: 'app-single-annonce',
  templateUrl: './single-annonce.component.html',
  styleUrls: ['./single-annonce.component.scss']
})
export class SingleAnnonceComponent implements OnInit {

  name: string ="Annonce";
  status: string = "Statut";

  constructor(private annonceService: AnnonceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];

    this.name = this.annonceService.getAnnonceById(+id)!.title;
    this.status = this.annonceService.getAnnonceById(+id)!.status;
  }

}
