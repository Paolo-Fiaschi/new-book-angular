import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/model/book';
const api_Url = 'http://localhost:3000/books';


@Component({
  selector: 'app-book-detail',
  template: `
    <div *ngIf="book">
      {{book.title}} - {{book.author}}
    </div>
  `,
  styles: [
  ]
})
export class BookDetailComponent implements OnInit {
  book: Book;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params.id;
    this.http.get<Book>(`${api_Url}/${id}`)
    .subscribe(res => {
      this.book = res;
    });

  }

}
