import { animate, group, keyframes, query, style, transition, trigger } from '@angular/animations';

export const appAnimations = trigger('routeAnimation', [
  transition(':increment', [
    group([
      query(
        'app-alert, :enter',
        animate(
          '300ms ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateY(-1rem)', display: 'block' }),
            style({ opacity: 1, transform: 'translateY(0px)' }),
          ]),
        ),
      ),
    ]),
  ]),
]);
