import React, { Component } from "react";
import { Header, Container } from "semantic-ui-react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//components
import BookList from "./components/BookList";

//setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <Header as="h1">That's the CRUD Application</Header>
          <BookList />
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
