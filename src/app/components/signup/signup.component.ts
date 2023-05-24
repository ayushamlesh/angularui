import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import validateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
//setting type of password
type: string="password";
isText:boolean=false;
//for changing icon
eyeIcon:string="fa-eye-slash";
signUpForm!:FormGroup;
constructor(private fb:FormBuilder,private auth:AuthService,private router:Router){}
  ngOnInit(): void {
    this.signUpForm=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })


  }

  hideShowPass(){
    this.isText =!this.isText;
    //if icon is open do close or vice versa
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    //if text change it to password
    this.isText?this.type="text" : this.type="password";
 }

 onSignUp(){
  if(this.signUpForm.valid)
  {
    //sent to db
         //sent to db
         this.auth.signUp(this.signUpForm.value)
         .subscribe(
           {
             next:(res)=>{
               alert(res.message)
               this.signUpForm.reset();
               this.router.navigate(['/login'])

             },
             error:(err)=>{alert(err?.error.message)}

           }
         )
  }
  else
  {
    //error
    validateForm.validateAllFormFields(this.signUpForm);

  }
}



}
