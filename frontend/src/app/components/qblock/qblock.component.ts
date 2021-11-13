import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { BlogEntriesPageable } from 'src/app/model/blog-entry.interface';
// import { BlogService } from 'src/app/services/blog-service/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './qblock.component.html',
  styleUrls: ['./qblock.component.scss']
})
export class QBlockComponent {
  // blogEntries$: Observable<T> = this.blogService.indexAll(1, 10);

  constructor() { }
}
