import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../model/book';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book',
  template: `

    <!-- Main Content -->
    <div class="container">
    <div class="alert alert-danger" *ngIf="error">Error</div>
      <div class="row">
        <div class="col-lg-6 col-md-12 mx-0">
          <ul class="list-group">
            <li
              class="list-group-item"
              *ngFor="let book of books"
              (click)="setActive(book)"
              [ngClass]="{'active': book.id === active?.id}"
              >
              <img [src]="book.img ? book.img : '../../assets/img/copertineLibri/add.png'" class="img-thumbnail mr-2" alt="" width="40">
              {{book.title}} - {{book.author}}
              <div class="pull-right">
                <span [style.color]="book.price > 15 ? 'red' : null ">€ {{book.price | number: '1.2-2'}}</span>
                <i class="fa fa-info-circle ml-2" aria-hidden="true" [routerLink]="['/book', book.id]"></i>
                <i class="fa fa-trash ml-2" (click)="delete($event, book)"></i>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-lg-6 col-md-12 mx-0">
          <app-form
            [active]="active"
            [books]="books"
            (resetClick)="reset()"
          >

          </app-form>
        </div>
      </div>
    </div>

    <hr>

  `,
  styles: [`
    .fa-trash,
    .fa-info-circle{
      cursor: pointer;
    }
    .list-group-item{
      font-size: 0.75em;
    }
    .list-group-item.active{
      z-index: 2;
      color: #fff;
      background-color: darkorange;
      border-color: darkorange;
    }
  `]
})
export class BookComponent implements OnInit {

  books: Book[];
  error: any;
  active: Book;

  constructor(
    private http: HttpClient,
    private bookService: BookService
    ) { }

  getAll(){
    this.bookService.getAll()
    .subscribe((res: Book[]) => {
      this.books = res;
    },
      err => this.error = err

    );
  }
  delete(event, book: Book){
    event.stopPropagation();
    this.bookService.deleteBook(book)
    .subscribe(() => {
      // const index = this.books.indexOf(book);
    const index = this.books.findIndex(b => b.id === book.id);
    this.books.splice(index, 1);
    // console.log(book);
    },
      err => this.error = err
    );
  }
  setActive(book: Book){
    this.active = book;
  }
  reset(){
    this.active = null;
  }
  ngOnInit(): void {
    this.getAll();
  }

}
