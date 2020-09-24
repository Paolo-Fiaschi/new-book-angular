import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../model/book';
import { NgForm } from '@angular/forms';

const api_Url = 'http://localhost:3000/books';
@Component({
  selector: 'app-book',
  template: `

    <!-- Main Content -->
    <div class="container">
    <div class="alert alert-danger" *ngIf="error">Error</div>
      <div class="row">
        <div class="col-lg-6 col-md-12 mx-0">
          <ul class="list-group">
            <li class="list-group-item" *ngFor="let book of books">
              {{book.title}} - {{book.author}}
              <div class="pull-right">
                <span [style.color]="book.price > 15 ? 'red' : null ">€ {{book.price | number: '1.2-2'}}</span>
                <i class="fa fa-trash ml-2" (click)="delete(book)"></i>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-lg-6 col-md-12 mx-0">
          <form #f="ngForm" (submit)="add(f)">
            <div class="form-group">
              <input [ngModel] type="text" class="form-control" name="title" placeholder="Insert title...">
            </div>
            <div class="form-group">
              <input [ngModel] type="text" class="form-control" name="author" placeholder="Insert author...">
            </div>
            <div class="form-group">
              <input [ngModel] type="number" class="form-control" name="price" placeholder="Insert price...">
            </div>
            <div class="form-group">
              <input [ngModel] type="text" class="form-control" name="isbn" placeholder="Insert isbn...">
            </div>
            <div class="form-group">
              <textarea [ngModel] class="form-control" rows="3" name="description" placeholder="Insert description..."></textarea>
            </div>
            <button type="submit" class="btn btn-outline-warning btn-sm mr-1">ADD</button>
          </form>
        </div>
      </div>
    </div>

    <hr>

  `,
  styles: [`
    .fa-trash{
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
    .btn-sm{
      font-size:.875rem;
      padding: .25rem .5rem;
      line-height: 1.5;
      border-radius: .2rem;
    }
  `]
})
export class BookComponent implements OnInit {

  books: Book[];
  error: any;

  constructor(private http: HttpClient) { }

  getAll(){
    this.http.get<Book[]>(api_Url)
    .subscribe((res: Book[]) => {
      this.books = res;
    },
      err => this.error = err

    );
  }
  add(form: NgForm){
    this.http.post<Book>(`${api_Url}`, form.value)
    .subscribe( (res: Book) => {
      this.books.push(res);
    });
  }
  delete(book: Book){
    this.http.delete<Book[]>(`${api_Url}/${book.id}`)
    .subscribe(() => {
      // const index = this.books.indexOf(book);
    const index = this.books.findIndex(b => b.id === book.id);
    this.books.splice(index, 1);
    // console.log(book);
    },
      err => this.error = err
    );
  }
  ngOnInit(): void {
    this.getAll();
  }

}
