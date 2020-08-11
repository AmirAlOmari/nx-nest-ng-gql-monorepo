import { Themes } from '../../enums/themes/themes.enum';

export interface AvailableTheme {
  displayName: string;
  theme: Themes;
  cssClass: string;
  selected?: boolean;
}
