import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceService } from '../annonces/services/annonce.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  defaultState = "A venir";

  constructor(private annonceService: AnnonceService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm)
  {
    const name = form.value["name"];
    const cote1 = form.value["cote1"];
    const cote2 = form.value["cote2"];
    const status = form.value["status"];
    this.annonceService.addAnnonce(name, cote1, cote2, status);
    this.router.navigate(["/annonces"]);

   // this.annonceService.getAnnonceFromServer();
  }



}
