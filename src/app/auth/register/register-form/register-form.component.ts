import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormBuilder,
  FormControl, FormGroup, Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../_service/auth.service";

export function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.re_password) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

export class RegisterFormComponent implements OnInit {
  public registerForm !: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.email,Validators.required]),
      pw: this.formBuilder.group({
        password: new FormControl('', [Validators.required]),
        re_password: new FormControl('', [Validators.required])
      }, { validators: comparePassword }),
      termCheck: new FormControl(false, Validators.requiredTrue)
    })
  }

  register() {
    let neededValue = {}
    this.submitted = true;

    // this.http.post<any>("http://localhost:3000/user", neededValue).subscribe(res => {
    //
    //   if (!this.registerForm.hasError('passwordnotmatch', ['pw']) && this.registerForm.value['termCheck'] == true) {
    //     alert("register success");
    //     this.registerForm.reset();
    //     this.router.navigate(['signin']);
    //   } else {
    //     alert("register false 2")
    //   }
    // }, err => {
    //   alert("register false"+err.value);
    // })
    if (!this.registerForm.hasError('passwordnotmatch', ['pw']) && this.registerForm.value['termCheck'] == true) {
      this.authService.register(this.registerForm.value['email'], this.registerForm.controls['pw'].value.password).subscribe(res => {
        alert("register success");
        this.router.navigate(['signin']);
      }, error => {
        alert("register false ")
      })
    }
  }
}
