import { Component, OnInit } from '@angular/core';
import {UserLogin} from '../../models/user';
import {LoginService} from '../../services/login.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin;

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
        console.log(data);
        this.router.navigate(['/home']);
      },
      error => {
        console.log('USERNAME O PASSWORD ERRATI');
      }
    );
  }

}
