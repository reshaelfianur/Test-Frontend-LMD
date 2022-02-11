import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { UserService } from 'src/app/core/user/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/services/common.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthSignInComponent implements OnInit {

    public form: FormGroup;

    public url: string = "/auth/sign-in";
    public title: string = "Sign-in";
    public module: string = "Auth";

    private storeKey: string = '__lastAction';
    public password: string = 'password';

    public isShow: boolean = false;
    public isRememberMe: boolean = false;
    public countFailedAttempt: number = 0;

    constructor(
        private authService: AuthService,
        private router: Router,
        private sessionService: SessionService,
        private commonService: CommonService,
        private toastr: ToastrService,
        private userService: UserService,
        private spinner: NgxSpinnerService) {

        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.form = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
            password: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        });
    }

    public onClick(): void {
        if (this.password === 'password') {
            this.password = 'text';
            this.isShow = true;
        } else {
            this.password = 'password';
            this.isShow = false;
        }
    }

    public onSubmit(): void {
        if (this.form.invalid) {
            this.toastr.error('The input data is invalid. Please check error message');
            return;
        }

        this.spinner.show();

        const data = this.form.value;

        this.authService.login(data.email, data.password).subscribe((output) => {
            this.spinner.hide();

            if (!output) {
                this.toastr.error('Username and Password does not match!');
                return;
            }

            this.toastr.success('Login Success');
            this.router.navigate(['/dashboard']);

            this.sessionService.save(this.storeKey, Date.now().toString());
            this.sessionService.save('cc', btoa(JSON.stringify(data.company_code)))
        });
    }

    public onRememberMe(value: any): void {
        this.isRememberMe = value;
    }
}
