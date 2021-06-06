import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "../../shared/components/base.component";

@Component({
  selector: "login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"]
})
export class LoginComponent extends BaseComponent{
  hidePassword: boolean = true;
  public form: FormGroup = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('')
  });

  login() {
    this.authService.login(this.form.controls['mail'].value, this.form.controls['password'].value)
  }

  register() {
    this.authService.register(this.form.controls['mail'].value, this.form.controls['password'].value);
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }
}
