import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../projects/shared-lib/src/lib/services/auth/auth.service';
import {ShellService} from '@app/shell/shell.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  private loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private shellService: ShellService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    this.loading = true;
    if (this.form.valid) {
      this.authService.login(this.form.value)
        .subscribe(
          data => {
            this.shellService.navigate(location.hash);
          },
          error => {
            this.loading = false;
            console.log("err")
          });
    }
    this.formSubmitAttempt = true;
  }

}
