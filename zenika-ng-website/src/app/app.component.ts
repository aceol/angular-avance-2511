import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MenuComponent,
        RouterOutlet,
        AlertComponent,
        FooterComponent,
    ],
})
export class AppComponent {}
