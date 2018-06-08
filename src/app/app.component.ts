import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  message: any;
  subscription: Subscription;

  constructor(private _userService:UserServiceService) {
    this.subscription = this._userService.getMessage().subscribe(message => { console.log(message) });
  }
  
}
