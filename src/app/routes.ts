import { EventResolver } from './events/event-resolver.service';
import { Routes } from '@angular/router';
import { Error404Component } from './errors/404.component';
import {
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventService,
    EventListResolver,
    CreateSessionComponent
   } from './events/index';

export const appRoutes: Routes = [
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    { path: 'events', component: EventsListComponent, resolve: { events: EventListResolver} },
    { path: 'events/:id', component: EventDetailsComponent, resolve: { event: EventResolver}},
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'user', loadChildren: './user/user.module#UserModule' }
];
