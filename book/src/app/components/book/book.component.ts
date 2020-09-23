import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../model/book';

@Component({
  selector: 'app-book',
  template: `

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-12 mx-0">
          <ul class="list-group">
            <li class="list-group-item" *ngFor="let book of books">
              {{book.title}} - {{book.author}}
              <div class="pull-right">
                € {{book.price | number: '1.2-2'}}
                <i class="fa fa-trash"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <hr>

  `,
  styles: [`
  `]
})
export class BookComponent implements OnInit {

  books: Book[];

  constructor(private http: HttpClient) { }

  getAll(){
    this.http.get<Book[]>('http://localhost:3000/books')
    .subscribe((res: Book[]) => {
      this.books = res;
    });
  }
  ngOnInit(): void {
    this.getAll();
  }

}
