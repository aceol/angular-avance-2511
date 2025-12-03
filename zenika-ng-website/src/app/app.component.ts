import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Pipe,
} from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { appAnimations } from './shared/app.animations';
import { BehaviorSubject, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

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
    AsyncPipe,
  ],
  animations: [appAnimations],
})
export class AppComponent {
  protected increment$ = new BehaviorSubject(0);

  constructor() {
    inject(Router)
      .events.pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.increment$.next(this.increment$.value + 1));
  }
}
