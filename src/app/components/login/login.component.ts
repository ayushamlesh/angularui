import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  //setting type of password
  type: string="password";
  isText:boolean=false;
  //for changing icon
  eyeIcon:string="fa-eye-slash";
  loginForm!:FormGroup;

  constructor(private fb: FormBuilder,private auth:AuthService,private route:Router){ }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      Email: ['',[Validators.required, Validators.email]],
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

  onLogin(){
      if(this.loginForm.valid)
      {
        //sent to db

        this.auth.login(this.loginForm.value)
        .subscribe(
          {
            next:(res)=>{
              alert(res.message)
              this.loginForm.reset();
              this.auth.storeToken(res.token);
              this.route.navigate(['dashboard'])
            },
            error:(err)=>{alert(err.error.message)}

          }
        )
        console.log(this.loginForm.value)
      }
      else
      {
        //error
        validateForm.validateAllFormFields(this.loginForm);

      }
  }
}
