import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { NotifyService } from '../../theme/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  // function:any;

  loader: boolean = false;
  loginForm!: FormGroup;
  loginvalues: any;
  accessToken: any;
  loginResult: any;
  fieldTextType: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private notifyservice: NotifyService, private router: Router) {
    this.accessToken = localStorage.getItem('access_token')
  }
  form: FormGroup = this.formBuilder.group({})

  ngOnInit() {

    this.loginForm = this.formBuilder.group({

      username: ['', Validators.required],
      password: ['', Validators.required],

    });

  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  submitLoginForm() {
    this.loader = true;
    this.loginvalues = JSON.stringify(this.loginForm.value);
    this.authService.signIn(this.loginvalues).subscribe((res: any) => {

      this.loginResult = res;

      if (this.loginResult.apiStatus == 0) {
        this.loginResult.result = JSON.parse(this.loginResult.result);

        this.accessToken = this.loginResult.result.AccessToken;
        localStorage.setItem('access_token', this.accessToken);

        if (this.accessToken) {
          this.showToasterSuccess();
          this.loader = !this.loader;
          this.router.navigate(['/dashboard']);
        }
        else {
          this.loader = !this.loader;
          this.showToasterError()
        }
      }
      else if (this.loginResult.apiStatus == 1 && this.loginResult.apiStatusMessage == "Incorrect user credentials") {
        this.showToasterWrongCredentials()
        this.loader = !this.loader;
      }
      else {
        this.loader = !this.loader;
        this.showToasterUserNotFound();
      }
    });;
  }

  showToasterSuccess() {

    this.notifyservice.showSuccess("Login Successfully !!", "")
  }

  showToasterError() {
    this.notifyservice.showError("There was an error while login", "")
  }

  showToasterUserNotFound() {

    this.notifyservice.showError("Please give the correct username", "User Not Found")

  }

  showToasterWrongCredentials() {
    this.notifyservice.showError("Please give the correct credentials", "Incorrect Password")
  }

  showToasterInfo() {
    this.notifyservice.showInfo("This is info", "tutsmake.com")
  }

}
