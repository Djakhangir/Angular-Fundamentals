import { EventService } from './shared/event.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventListResolver implements Resolve<any> {

    constructor(private eventService: EventService) {

    }

    // a Resolver acts like middleware, which can be executed before a component is loaded.

    // resolver automatically subscribe to the observable get method. meaning that we dont need to subscribe to the getEvents,
    // since it subscribes to itself automatically;
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.eventService.getEvents();
    }
}
