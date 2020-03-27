/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://app.skaffolder.com/#!/register?friend=5e75197f06e8563f32296087
*
* You will get 10% discount for each one of your friends
* 
*/
import { Component } from '@angular/core';
import { User } from 'src/app/domain/projeto1_db/user';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { SHA3 } from 'sha3';
import { Router } from '@angular/router';
import { store } from 'src/app/security/current-user';
import { SecurityService } from 'src/app/security/services/security.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    user: User = new User(null, null, null, null);
    showError: boolean;
    remember: boolean;
    constructor(
        private securityService: SecurityService,
        private router: Router
    ) {}
    login(form: NgForm) {
        if (form.valid) {
            const hash = new SHA3(512);
            hash.update(this.user.password);
            const sha3pass = hash.digest('hex');
            this.securityService.login(this.user.username, sha3pass, this.remember === undefined ? false : this.remember)
            .subscribe(
                user => {
                    this.showError = false;
                    this.router.navigate(['/']);
                    this.setUser(user);
                },
                err => this.showError = true
            );
        }
    }
    private setUser(user: User) {
        store.setUser(user);
    }
}
