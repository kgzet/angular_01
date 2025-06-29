import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ELEMENT_DATA } from '../data/element-data';
import { PeriodicElement } from '../models/periodic-element.model';

@Injectable({ providedIn: 'root' })
export class ElementService {
  getElements(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA).pipe(delay(1000));
  }
}
