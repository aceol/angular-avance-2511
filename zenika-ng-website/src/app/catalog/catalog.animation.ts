import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const catalogAnimations = [
  trigger('flip', [
    transition(
      'false => true',
      animate(
        '750ms ease-in-out',
        keyframes([style({ transform: 'rotateY(0)', offset: 0 }), style({ transform: 'rotateY(360deg)', offset: 1 })]),
      ),
    ),
  ]),

  trigger('disappear', [transition('* => void', [animate('500ms ease-in-out'), style({ height: '0px', opacity: 0 })])]),

  trigger('appearWithDelay', [
    transition('void => *', [style({ opacity: 0 }), animate('500ms 500ms linear'), style({ opacity: 1 })]),
  ]),
];
