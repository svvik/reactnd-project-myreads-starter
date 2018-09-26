import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Book from './Book'

class SearchBook extends Component {

  state = {
    query: '',
    books: []
  }

  handleSubmitForm = (e) => {
    e.preventDefault()
  }

  changeQuery(query) {
    this.setState({query})
    this.handleSearch(query)
  }

  handleSearch(query) {
    if (query.length === 0) {
      this.setState({books: []})
      return
    }
    BooksAPI.search(query).then((books) => {
      if (!books || books.hasOwnProperty('error')) {
        this.setState({books : []})
      } else {
        this.setState({books})
      }
    }).catch((ex) => {
      this.setState({books : []})
    })
  }

  getBookShelf = (book, bookdOnTheShelves) => {
    let bookFromShelf = bookdOnTheShelves.find( bi => bi.id === book.id)
    return bookFromShelf ? bookFromShelf.shelf : "none";
  }

  render() {
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className='close-search'>Close</Link>
            <div className="search-books-input-wrapper">
              <form onSubmit={this.handleSubmitForm} className='search-book-form'>
                <input type="text"
                       placeholder="Search by title or author"
                       value={this.state.query}
                       onChange={(e) => this.changeQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="search-books-results">
            {
              this.state.books.length === 0 && this.state.query.length !== 0 ? (
                 <strong>NO RESULTS</strong>
              ) : (
              <ol className="books-grid">
              {
                this.state.books.map((book) => (
                    <li key={book.id}>
                      <Book book={book}
                            onChange={(e, book) => {
                              this.props.onAddBook(book, e.target.value)
                            }}
                            getBookShelf = { (book) => this.getBookShelf(book, this.props.books) }
                      />
                    </li>
                ))
              }
              </ol>
              )
            }
          </div>
        </div>
    )
  }
}

export default withRouter(SearchBook)