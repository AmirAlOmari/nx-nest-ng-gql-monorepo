import {
  trigger,
  transition,
  query,
  style,
  group,
  animate,
} from '@angular/animations';

export const enterAnim = [
  style({ transform: 'translateX(-100%) scale(0.5)', opacity: 0 }),
  animate(
    '0.5s ease-in-out',
    style({ transform: 'translateX(0%)', opacity: 0.5 })
  ),
  animate('0.1s', style({ opacity: 1 })),
];

export const leaveAnim = [
  style({ transform: 'translateX(0%)', opacity: 1 }),
  animate(
    '0.5s ease-in-out',
    style({ transform: 'translateX(100%) scale(0.5)', opacity: 0 })
  ),
];

export const routeSlideInAnimation = trigger('routeAnimations', [
  transition(':enter', query(':enter', enterAnim, { optional: true })),
  transition('* => *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true,
    }),
    group([
      query(':enter', enterAnim, { optional: true }),
      query(':leave', leaveAnim, { optional: true }),
    ]),
  ]),
]);
