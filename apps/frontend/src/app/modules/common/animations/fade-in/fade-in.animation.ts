import {
  trigger,
  transition,
  query,
  style,
  group,
  animate,
} from '@angular/animations';

export const enterAnim = [
  style({ opacity: 0 }),
  animate('0.5s ease-in-out', style({ opacity: 1 })),
];

export const leaveAnim = [
  style({ opacity: 1 }),
  animate('0.5s ease-in-out', style({ opacity: 0 })),
];

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [query('*', enterAnim, { optional: true })]),
  transition(':leave', [query('*', leaveAnim, { optional: true })]),
]);
