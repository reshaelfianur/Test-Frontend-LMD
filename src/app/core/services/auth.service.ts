import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Observer } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { SessionService } from './session.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public message: any;
	public originalResult: any;

	constructor(
		private http: HttpClient,
		private spinner: NgxSpinnerService,
		private sessionService: SessionService,
	) { }

	getMessage(): string {
		return this.message;
	}

	getOriginalResult(): string {
		return this.originalResult;
	}

	isSignin(): boolean {
		if (this.sessionService.getLoginId() != null) {
			return true;
		}
		return false;
	}

	login(email: string, password: string) {
		return new Observable(observer => {

			let url = `${this.sessionService.server}/users?email=${email}&password${password}`;

			this.spinner.show();

			this.http.get(url, { headers: this.sessionService.authHeader() }).subscribe((respond: any) => {
				this.spinner.hide();

				if (!respond.status) {
					observer.next(false);
					observer.complete();

					return (observer).unsubscribe();
				}

				this.sessionService.setAuthentication(respond.data.user.id, respond.data.user.token);
				this.sessionService.setUser(respond.data.user);

				observer.next(respond);
				observer.complete();

				return (observer).unsubscribe();
			});
		});
	}

	logout() {
		this.sessionService.logout();
	}
}

