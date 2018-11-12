import React from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";

import { getAuthorsQuery, addBookMutation ,getBooksQuery} from "../queries/book";

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  authorOptions = () => {
    const data = this.props.getAuthorsQuery;
    return data.loading
      ? []
      : data.authors.map(author => {
          return { key: author.id, text: author.name, value: author.id };
        });
  };

  addBook = () => {
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorid: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  render() {
    return (
      <Form onSubmit={this.addBook}>
        <Form.Group>
          <Form.Input
            label="Enter a name for the Book"
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <Form.Input
            label="Enter a genre for the Book"
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
          />
          <Form.Select
            options={this.authorOptions()}
            label={{
              children: "Author",
              htmlFor: "form-select-control-author"
            }}
            placeholder="select an Author"
            search
            searchInput={{ id: "form-select-control-author" }}
            onChange={(e, data) => this.setState({ authorId: data.value })}
          />
          <Button type="submit" primary>
            <Icon name="add" />
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
