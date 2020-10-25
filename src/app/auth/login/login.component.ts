import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from './../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationWidth } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage = '';
  isError: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginRequestPayload = {
      username: '',
      password: '',
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Sign up Successful');
          this.registerSuccessMessage = "Please check your inbox for activation link. Activate your account before you login."
        }
      })
  }

  login() {
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    this.loginRequestPayload.username = this.loginForm.get('username').value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      if (data) {
        this.router.navigateByUrl('');
        this.toastr.success('Login Successful');
      } else {
        this.isError = true;
      }
    });
  }

}
