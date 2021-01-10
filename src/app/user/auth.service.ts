import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IUser } from './user.model';


@Injectable()
export class AuthService {
    currentUser: IUser;

    constructor(private http: HttpClient) { }

    loginUser(userName: string, password: string) {
        // just FYI username/password key is all lowercase because server requires it like that;
            const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
            const loginInfo = { username: userName, password };
            return this.http.post('/api/login', loginInfo, options)
            .pipe(tap(data => {
                this.currentUser = <IUser>data['user'];
            }))
            // tap method jumps into the stream of data and take an action;
            .pipe(catchError( err => {
                return of(false);
            }));
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    checkAuthenticationStatius() {
        // we can just subscribe instead of piping and taping, but tapping is better due to returning Observable and
        // let the consumer check the authentication status on actually subscribed and take an action when data comes back;

        // i prefer to subscribe here instead of the events.app.component and return here, so delete return and subscribe here;
   this.http.get('/api/currentIdentity')
        .pipe(tap(
            data => {
                if (data instanceof Object) {
                    this.currentUser = data as IUser;
                }
            }
        )).subscribe();
    }

    updateCurrentUser(firstName: string, lastName: string) {
        // currentUser should be formatted as server expects for put method;
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;

        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
    }

    logout() {
        // we need to set the user (instantiate)in order to log out on the client
        this.currentUser = undefined;
        // endpoint exists in server already;

        // instead of passing the currentUser accross the wire and user id we pass empty object in post method,
// it was pre determined by the server creator since we could have made the call as put() or get() too but we really want
// to server to figure out who the user is and logout that user rather than wiring the user id accross the wire;
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
        return this.http.post('/api/logout', {}, options);
    }
}
