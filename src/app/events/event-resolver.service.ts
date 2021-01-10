import { EventService } from './shared/event.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventResolver implements Resolve<any> {

    constructor(private eventService: EventService) {

    }

    // a Resolver acts like middleware, which can be executed before a component is loaded.
    resolve(
        // ActivatedRouteSnapshot need to be injected in order to reach the id that should be passed for the certain event;
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.eventService.getEvent(route.params.id);
    }
}
