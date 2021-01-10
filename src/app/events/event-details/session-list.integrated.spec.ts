import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionListComponent } from './session-list.component';
// import { CollapsibleWellComponent } from './../../common/collapsible-well.component';
// import { UpvoteComponent } from './upvote.component';
import { ISession } from './../shared/event.model';
import { VoterService } from './voter.service';
import { AuthService } from './../../user/auth.service';
import { By } from '@angular/platform-browser';
import { DurationPipe } from './../shared/duration.pipe';


describe('SessionListComponent', () => {

    let fixture: ComponentFixture<SessionListComponent>,
    component: SessionListComponent,
    element: HTMLElement,
    debugEl: DebugElement;

    // this beforeEach is async and should be completed before we create the instance of the component.

    beforeEach(async(() => {
        const mockAuthService = {
            isAuthenticated: () => true,
            currentUser: {userName: 'Joe'}
        }; // mocking the service
        const mockVoterService = {
            userHasVoted: () => true
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                // UpvoteComponent,
                DurationPipe,
                // CollapsibleWellComponent
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: VoterService, useValue: mockVoterService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe('initial display', () => {

        it('should have the correct session title', () => {
            component.sessions = [{
                id: 3,
                name: 'Session 1',
                presenter: 'Joe',
                duration: 1,
                level: 'beginner',
                abstract: 'abstract',
                voters: ['john', 'bob']
            }];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();
            // expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
            expect(debugEl.query(By.css('[well-title')).nativeElement.textContent).toContain('Session 1');
        });
    });
});

