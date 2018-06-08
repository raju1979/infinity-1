import { Component, OnInit, NgZone, OnDestroy, DoCheck } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserServiceService } from '../../services/user-service.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-accordion-container',
  templateUrl: './accordion-container.component.html',
  styleUrls: ['./accordion-container.component.css']
})
export class AccordionContainerComponent implements OnInit, OnDestroy, DoCheck {

  subscription: Subscription;
  users: any;

  constructor(private _userService:UserServiceService,  private _zone: NgZone, private _router:Router) { 
    this.subscription = this._userService.getMessage()
                        .subscribe(user => {
                          this._zone.run(() =>{
                              this.users = user;
                              console.log(this.users);        
                          });                           
                        });
  }

  ngOnInit() {
    this.users = this._userService.getUsersData();
  }

  edit(id) {
    console.log(id);
    this._router.navigate(['/edit', id]);
  }

  delete(id) {
    console.log(id);
    this._userService.deleteUserById(id);
  }

  ngDoCheck() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
