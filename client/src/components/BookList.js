import React, { Component } from "react";
import { List, Header, Container, Divider, Segment } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
//components
import AddBook from "./AddBook";
//queries
import { getBooksQuery } from "../queries/book";
import BookDetails from "./BookDetails";

const DisplayBooks = (data) => {
  console.log(data)
  return data.loading ? (
    <List.Item disabled>Loading books...</List.Item>
  ) : (
    data.books.map(book => {
      return (
        <List.Item key={book.id}>
          <List.Content onClick={e => this.setState({ selected: book.id })}>
            <List.Header>{book.name}</List.Header>
            <List.Description>{book.genre}</List.Description>
          </List.Content>
        </List.Item>
      );
    })
  );
};

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  
  render() {
    return (
      <Container>
        <Header as="h3">List of Books</Header>
        <Segment>
          <AddBook />
          <Divider />
          <List>
            <DisplayBooks books = {this.props.getBooksQuery}/>
          </List>
          <BookDetails bookId={this.state.selected} />
        </Segment>
      </Container>
    );
  }
}

export default compose(graphql(getBooksQuery, { name: "getBooksQuery" }))(
  BookList
);
