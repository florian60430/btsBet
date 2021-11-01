import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paris',
  templateUrl: './paris.component.html',
  styleUrls: ['./paris.component.scss']
})
export class ParisComponent implements OnInit {

  @Input() idParis! :number;
  @Input() cote! : number;
  @Input() reponse! :string;
  @Input() idAnnonce! :number;

  constructor() { }

  ngOnInit(): void {
  }

}
