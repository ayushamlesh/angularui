import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class dashboardComponent {
  //array of users
  // public users:any=[];
  constructor(private auth:AuthService){  }

  // ngOnInit(){
  // this.auth.getUsers()
  // .subscribe(res=>{this.users=res;})
  // }
  // //function to clear the stored data
  logout()
  {
    //callig signout present in the services
    this.auth.signOut();
  }

}

