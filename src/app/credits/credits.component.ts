import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../annonces/services/user.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {

  creditsSubscription!: Subscription;
  //creditsList: { email: string, credits: number }[] = [];
  creditsList = [
    {
      email :'test.123',
      credits : -1
    }
  ];
  constructor(private userService: UserService) {

    
    // this.creditsList[0].credits = 0;
    // this.userService.getUserBankroll();
    setTimeout(
      () => {
        //this.creditsList = this.userService.user;
      }, 500
    );
  }


  ngOnInit(): void {

    this.creditsSubscription = this.userService.userSubject.subscribe(
      (credits: any[]) => {
        this.creditsList = credits;
      }
    );
  }

}
