import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookList extends Component {
  renderList() {
    return this.props.books.map((book) => {
      return (
        <li key={book.title} className='list-group-item'>{book.title}</li>
      );
    });
  }

  render() {
    return (
      <div className='container'>
        <ul className='list-group col-sm-4'>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // returns props for BookList
  return {
    books: state.books
  };
}

export default connect(mapStateToProps)(BookList);
