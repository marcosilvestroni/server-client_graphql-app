import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/book";

class BookDetails extends Component {
  render() {
    console.log(this.props);
    return <div />;
  }
}

export default graphql(getBookQuery)(BookDetails);
