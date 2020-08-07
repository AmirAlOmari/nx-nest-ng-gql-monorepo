import {
  trigger,
  transition,
  query,
  style,
  group,
  animate,
} from '@angular/animations';

export const enterAnim = [
  style({ transform: 'translateY(100%)', opacity: 0 }),
  animate(
    '0.5s ease-in-out',
    style({ transform: 'translateY(0%)', opacity: 0.5 })
  ),
  animate('0.1s', style({ opacity: 1 })),
];

export const leaveAnim = [
  style({ transform: 'translateY(0%)', opacity: 1 }),
  animate(
    '0.5s ease-in-out',
    style({ transform: 'translateY(-100%)', opacity: 0 })
  ),
];

export const headerSlideDownAnimation = trigger('headerAnimations', [
  // transition(':enter', [query('*', enterAnim, { optional: true })]),
  transition(':leave', [query('*', leaveAnim, { optional: true })]),
]);
