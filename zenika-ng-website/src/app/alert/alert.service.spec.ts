import expect from 'expect';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AlertComponent } from './alert.component';
import { of } from 'rxjs';

const MockAlertService: Partial<AlertService> = {
    alerts$: of([
        { type: 'danger', content: 'Danger' },
        { type: 'success', content: 'Success' },
    ]),
};

describe('AlertService', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;

    beforeEach(() => {
        // Given
        TestBed.configureTestingModule({
            imports: [AlertComponent],
            providers: [
                {
                    provide: AlertService,
                    useValue: MockAlertService,
                },
            ],
        });

        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;

        // When
        fixture.detectChanges();
    });

    it('should display alerts', () => {
        // Then
        const [danger, success] = Array.from(
            (fixture.nativeElement as HTMLElement).querySelectorAll(
                '[data-test]'
            )
        );

        expect(danger?.className).toContain('danger');
        expect(danger?.textContent).toContain('Danger');

        expect(success?.className).toContain('success');
        expect(success?.textContent).toContain('Success');
    });
});
