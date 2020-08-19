import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  ChangeDetectorRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil, startWith, pairwise } from 'rxjs/operators';

import { Themes } from './modules/common/enums/themes/themes.enum';
import { ThemeService } from './modules/common/services/theme/theme.service';

@Component({
  selector: 'frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    public renderer2: Renderer2,
    public http: HttpClient,
    public themeService: ThemeService,
    public cd: ChangeDetectorRef
  ) {}

  private _theme$ = this.themeService.stream$();

  ngDestroy$ = new Subject<void>();

  theme: Themes | null = this.themeService.get();

  updateThemeOnBody(oldTheme: Themes, newTheme: Themes) {
    const bodyEl = document.body;
    const cssClassForOldTheme = this.themeService.createCSSClassForTheme(
      oldTheme
    );
    const cssClassForNewTheme = this.themeService.createCSSClassForTheme(
      newTheme
    );

    this.renderer2.removeClass(bodyEl, cssClassForOldTheme);
    this.renderer2.addClass(bodyEl, cssClassForNewTheme);
  }

  subscribeToTheme() {
    this._theme$
      .pipe(
        startWith(this.themeService.get()),
        pairwise(),
        takeUntil(this.ngDestroy$)
      )
      .subscribe(([oldTheme, newTheme]) => {
        this.theme = newTheme;

        this.cd.detectChanges();

        this.updateThemeOnBody(oldTheme, newTheme);
      });
  }

  ngOnInit(): void {
    this.subscribeToTheme();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
