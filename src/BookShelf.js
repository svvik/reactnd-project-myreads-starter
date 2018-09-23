import React, {Component} from 'react'
import Book from './Book'

class BookShelf extends Component {
  map = new Map([
      ["currentlyReading", "Currently Reading"],
      ["wantToRead", "Want to Read"],
      ["read", "Read"],
      ["none", "None"]
  ])

  render() {
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.map.get(this.props.shelf)}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                this.props.books.filter(book => book.shelf === this.props.shelf).map((book) => (
                    <li key={book.id}>
                      <Book book={book} onChange={(e, book) => this.props.updateBookAction(book, e.target.value)} />
                    </li>
                ))
              }
            </ol>
          </div>
        </div>
    )
  }
}


export default BookShelf