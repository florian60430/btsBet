import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { Subscription } from 'rxjs';
import { UserService } from '../annonces/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users!: User[];
  userSubscription!: Subscription;

  singleUser = <User>{};

  constructor(private userService: UserService) { }

  ngOnInit() {
   /* this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.userService.emitUsers();
    console.log(this.users);*/

  /*  this.singleUser = this.userService.signleUser;

    if(Object.keys(this.singleUser).length != 0)
    {
    console.log(this.userService.signleUser);
    console.log("coucou");
    } else
    {
      //fetchSingleUser(); recupérer les info de l'utilisateur connecté avec firebase.auth()
      this.singleUser = this.userService.signleUser;
    }*/
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onFetchProfile()
  {
    
  }


}
