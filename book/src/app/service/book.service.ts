import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
const api_Url = 'http://localhost:3000/books';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  //METODO GET RICEZIONE DATI
  getAll(): Observable <Book[]> {
    return this.http.get<Book[]>(api_Url);

  }

  // METODO POST AGGIUNTA DATI
  addBook(form: NgForm): Observable <Book> {
    return this.http.post<Book>(`${api_Url}`, form.value);
  }

  // METODO PATCH MODIFICA DATI
  editBook(form: NgForm, active: Book): Observable <Book> {
    return this.http.patch<Book>(`${api_Url}/${active.id}`, form.value);
  }

  // METODO DELETE CANCELLAZIONE DATI
  deleteBook(book: Book): Observable <Book> {
    return this.http.delete<Book>(`${api_Url}/${book.id}`);

  }

  constructor(
    private http: HttpClient,
    ) { }
}
