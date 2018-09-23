import React, {Component} from 'react'

class Book extends Component {
  items = ["currentlyReading", "wantToRead", "read", "none"]
  map = new Map([
      ["currentlyReading", "Currently Reading"],
      ["wantToRead", "Want to Read"],
      ["read", "Read"],
      ["none", "None"]
  ])

  render() {
    let book = this.props.book;
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.smallThumbnail})`
            }}></div>
            <div className="book-shelf-changer">
              <select defaultValue="1" onChange={(e) => this.props.onChange(e, book)}>
                <option value="move" disabled>Move to...</option>
                {
                  this.items.filter(item => item !== book.shelf).map((item) => (
                      <option value={item} key={item}>{this.map.get(item)}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
    )
  }
}


export default Book