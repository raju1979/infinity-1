import { Component, OnInit, AfterViewInit, ViewChild, NgZone, OnDestroy, ElementRef, Renderer2  } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { Subscription } from 'rxjs';
import { UUID } from 'angular2-uuid';
import _ from "lodash";

declare var $:any;

@Component({
  selector: 'app-forms-container',
  templateUrl: './forms-container.component.html',
  styleUrls: ['./forms-container.component.css']
})
export class FormsContainerComponent implements OnInit, OnDestroy {

 
  @ViewChild("f") userForm;
  @ViewChild('file') fileField: ElementRef;

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

  uuid: any;

  users: any;

  constructor(private _userService:UserServiceService, private _zone: NgZone) {
    this.subscription = this._userService.getMessage()
                        .subscribe(user => {
                          this._zone.run(() =>{
                            this.users = user;
                            console.log(this.users);        
                          });
                        });    
    this.uuid = UUID.UUID();
  }


  ngOnInit() {
    this.users = this._userService.getUsersData();
  }

  submit(f) {
    const email = f.value.email;
    let emailIndex;
    console.log(this.users, email);
    if(this.users) {
      emailIndex = _.findIndex(this.users.users, function(o) { return o.email == email; });
      if(emailIndex > -1) {
        alert('Duplicate Email');
        this.email = '';
      } else {   
        this._userService.addUser(f.value);
        this.fileField.nativeElement.value = '';
        this.hiddenValue = '';
        this.rawImgSrc = '';
        this.userForm.reset();
      } 
    }else {
      this._userService.addUser(f.value);
      this.fileField.nativeElement.value = '';
      this.hiddenValue = '';
      this.rawImgSrc = '';
      this.userForm.reset();
    }
    
    // this._userService.addUser(f.value);
    // this.userForm.reset();
    this.uuid = UUID.UUID();   
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.rawImgSrc = event.currentTarget.result;
        this.hiddenValue = this.rawImgSrc;
      }
    }
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  

}
