import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from "./BookShelf";
import SearchBook from "./SearchBook";
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.loadBooks();
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((responce) => {
      this.loadBooks();
    })
  }

  loadBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  onCloseSearch = () => {
    this.setState({showSearchPage: false})
  }

  onAddBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((responce) => {
      this.loadBooks();
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf books={this.state.books}
                             shelf={"currentlyReading"}
                             updateBookAction={this.updateBook}/>
                  <BookShelf books={this.state.books}
                             shelf={"wantToRead"}
                             updateBookAction={this.updateBook}/>
                  <BookShelf books={this.state.books}
                             shelf={"read"}
                             updateBookAction={this.updateBook}/>
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
        )}/>
        <Route
            path='/search' render={() => (
            <SearchBook onClose={this.onCloseSearch}
                        onAddBook={this.onAddBook} />
        )}/>
      </div>
    )
  }
}

export default withRouter(BooksApp)
