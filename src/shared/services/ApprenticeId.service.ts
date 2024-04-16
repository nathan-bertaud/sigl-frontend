import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApprenticeIdService {
  private apprenticeIdSubject = new BehaviorSubject<number | null>(null);
  apprenticeId$ = this.apprenticeIdSubject.asObservable();

  setApprenticeId(id: number) {
    this.apprenticeIdSubject.next(id);
  }
}