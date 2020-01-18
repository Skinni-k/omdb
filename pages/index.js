import React from 'react';
import Link from 'next/link';
import Layout from '../components/MyLayout';
import fetch from 'isomorphic-unfetch';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      results: [],
      total_results: 0,
      page_numbers: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async searchResult(title, page) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=953a036f&s=${title}&page=${page}`
    );
    const data = await res.json();
    if (data.Response === 'True') {
      this.setState({
        results: data.Search,
        total_results: data.totalResults,
        page_numbers: this.renderPageNumbers(data.totalResults / 10)
      });
    } else {
      this.setState({ results: [], total_results: 0 });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let title = this.state.value;
    this.searchResult(title, 1);
  }

  goToPage(page_number) {
    let title = this.state.value;
    this.searchResult(title, page_number);
  }

  renderPageNumbers(total_results) {
    let pageNumberArray = [];
    for (let index = 0; index < total_results; index++) {
      pageNumberArray.push(index + 1);
    }
    return pageNumberArray;
  }

  render() {
    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <h1>Search Results</h1>
        <h2>Found {this.state.total_results} results</h2>
        <ul>
          {this.state.results.map((result, i) => (
            <li key={i}>
              <Link href="/p/[id]" as={`/p/${result.imdbID}`}>
                <a itemProp={this.state.apikey}>{result.Title}</a>
              </Link>
            </li>
          ))}
          {this.state.page_numbers.map(page_number => (
            <span onClick={e => this.goToPage(page_number)} key={page_number}>
              {page_number} |
            </span>
          ))}
        </ul>
      </Layout>
    );
  }
}
