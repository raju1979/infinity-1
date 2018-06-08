import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import _ from "lodash";

declare var $:any;


@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit {

  @ViewChild("f") userForm;

  message: any;
  subscription: Subscription;

  hiddenValue = '';
  email: string;
  name: string;
  age: number;
  myMac: string = '';
  mask = [  /\w/, /\w/,  '.', /\w/, /\w/, '.', /\w/, /\w/,  '.' , /\w/, /\w/, '.', /\w/, /\w/, '.', /\w/, /\w/];
  rawImgSrc:string;
  data: any;


  users: any;
  id:any;
  user: any;
  uuid:string;
  private sub: any;

  constructor(private _userService:UserServiceService, private _route:ActivatedRoute, private _router: Router) {
    // this.subscription = this._userService.getMessage()
    //                     .subscribe(user => {
    //                       console.log(user)
    //                        this.users = user;
    //                        console.log(this.users.users[0]);
    //                     });    

  }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
       this.id = params['id'];       
       console.log(this.id);

       if(!this.id) {
         this._router.navigate(['/']);
       } 
        this.user = this._userService.getUserDetails(this.id);
        if(!this.user) {
          this._router.navigate(['/']);
        }
        console.log(this.user);
        this.name = this.user.name;
        this.email = this.user.email;
        this.age = this.user.age;
        this.uuid = this.user.useruid;
        this.myMac = this.user.mac;
        this.hiddenValue = this.user.userimg;
       // In a real app: dispatch action to load the details here.
    });
  }

  ngAfterViewInit() {
    
    
    
  }

  submit(f) {

    const email = f.value.email;
    let emailIndex;
    emailIndex = this._userService.findUserByEmail(email);
    if(emailIndex > -1 && (email != this.user.email)) {
      alert('Duplicate Email');
      this.email = '';
    } else {   
      this._userService.setUser(this.id, f.value);
      this.userForm.reset();
      this._router.navigate(['/']);
    } 

    console.log(f.value);
    
       
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.rawImgSrc = event.currentTarget.result;
        this.hiddenValue = this.rawImgSrc;
        console.log(event);
        console.log(this.rawImgSrc);
        
      }
    }
  };

}
