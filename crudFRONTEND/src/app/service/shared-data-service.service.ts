import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  private idSource = new BehaviorSubject<number | undefined>(undefined);
  currentId = this.idSource.asObservable();

  changeId(id: number) {
    this.idSource.next(id);
  }

}
