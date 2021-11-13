import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './qblock.component.html',
  styleUrls: ['./qblock.component.scss']
})
export class QBlockComponent {
  // blogEntries$: Observable<T> = this.blogService.indexAll(1, 10);

  constructor() { }
}
