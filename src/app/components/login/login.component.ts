import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin;
  loginError: boolean = false;
  loginDenied: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) {

    this.userLogin = {
      email: '',
      password: ''
    };

  }

  ngOnInit() { }

  login(user: UserLogin) {
    console.log(user);
    this.loginService.login(user).subscribe(
      data => {
        if (data.role === 'manager') {
          console.log('USER :>> ', data);
          this.router.navigateByUrl('/home');
        }
        this.loginDenied = true;
      },
      error => {
        this.loginError = true;
        console.log('err: ', error.message);
      }
    );
  }

}
