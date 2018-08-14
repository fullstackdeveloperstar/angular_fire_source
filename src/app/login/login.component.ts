import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [AuthService]
})
export class LoginComponent implements OnInit {
  logininfo = {
    email: '',
    password: ''
  };
  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login(){
    console.log(this.logininfo);
    var me = this;
    this.auth.loginWithEmail(this.logininfo.email, this.logininfo.password).then(function(data){
     console.log(me.auth.authState);
      me.router.navigate(['/contracts']);
    });
  }

}
