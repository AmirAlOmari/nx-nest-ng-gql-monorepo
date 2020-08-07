import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  // tslint:disable-next-line: no-console
  debug = console.debug;
}
