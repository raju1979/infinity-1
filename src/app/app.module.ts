import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {Routes, RouterModule} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FormsContainerComponent } from './components/forms-container/forms-container.component';

import { TextMaskModule } from 'angular2-text-mask';
import { AgeValidatorDirective } from './directives/age-validator.directive';
import { EmailDuplicateValidatorDirective } from './directives/email-duplicate-validator.directive';
import { AccordionContainerComponent } from './components/accordion-container/accordion-container.component';
import { MainOuterComponent } from './components/main-outer/main-outer.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditUserFormComponent } from './components/edit-user-form/edit-user-form.component';

const routes:Routes = [
  {path: '', component: MainOuterComponent},
  {path: 'edit/:id', component: EditUserComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormsContainerComponent,
    AgeValidatorDirective,
    EmailDuplicateValidatorDirective,
    AccordionContainerComponent,
    MainOuterComponent,
    EditUserComponent,
    EditUserFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    TextMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
