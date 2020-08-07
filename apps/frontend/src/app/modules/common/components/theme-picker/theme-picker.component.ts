import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Themes } from '../../enums/themes/themes.enum';
import { AvailableTheme } from '../../interfaces/available-theme/available-theme.interface';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'frontend-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePickerComponent implements OnInit {
  constructor(public themeService: ThemeService) {}

  availableThemes: AvailableTheme[] = Object.entries(Themes).map(
    ([key, value]) => ({
      displayName: this.themeToName(value),
      theme: value,
    })
  );

  availableClick(availableTheme: AvailableTheme) {
    this.availableThemes.forEach((at) => (at.selected = false));

    availableTheme.selected = true;

    this.themeService.set(availableTheme.theme);
  }

  themeToName(theme: Themes) {
    const words = theme.split('-');
    const capitalizedFirstLetterWords = words.map(this.capitalizeFirstLetter);

    const name = capitalizedFirstLetterWords.join(' ');

    return name;
  }

  capitalizeFirstLetter(str: string) {
    const splitted = str.split('');
    const firstLetter = splitted[0];
    const capitalizedFirstLetter = firstLetter.toLocaleUpperCase();

    splitted.shift();

    const symbols = [capitalizedFirstLetter, ...splitted];
    const capitalizedFirstLetterStr = symbols.join('');

    return capitalizedFirstLetterStr;
  }

  initSelectedAvailableTheme() {
    const selectedTheme = this.themeService.get();

    const foundAvailableTheme = this.availableThemes.find(
      (at) => at.theme === selectedTheme
    );

    foundAvailableTheme.selected = true;
  }

  ngOnInit(): void {
    this.initSelectedAvailableTheme();
  }
}
