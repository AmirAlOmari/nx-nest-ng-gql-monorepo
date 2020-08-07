import type { NavigationExtras } from '@angular/router';

export interface DrawerButton {
  title: string;
  matIconName?: string;
  navigate: {
    commands: string[];
    extras?: NavigationExtras;
  };
}
