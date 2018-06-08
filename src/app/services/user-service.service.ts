import { Injectable } from '@angular/core';

// creation and utility methods
import { Observable, Subject, pipe } from 'rxjs';
// operators all come from `rxjs/operators`
import { map, takeUntil, tap } from 'rxjs/operators';

import _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  subject = new Subject<any>();

  users: Array<any>  = [];

  constructor() { }

  sendMessage() {    
    this.subject.next({ users: this.users });
  }

  addUser(message: any) {
    console.log(message);
    this.users.push(message);
    this.sendMessage();
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

  getUserDetails(id) {
    const user = _.find(this.users, function(o) { return o.useruid == id; });
    return user;
  }

  setUser(id, newdata) {
    const userIndex = _.findIndex(this.users, function(o) { return o.useruid == id; });
    this.users[userIndex] = newdata;
    this.sendMessage();
  }

  getUsersData() {
    let users:any = {};
    users.users = this.users;
    return users;
  }

  findUserByEmail(email) {
    const userIndex = _.findIndex(this.users, function(o) { return o.email == email; });
    return userIndex;
  }

  deleteUserById(id) {
    const userIndex = _.findIndex(this.users, function(o) { return o.useruid == id; });
    this.users.splice(userIndex,1);
    this.sendMessage();
  }


}
