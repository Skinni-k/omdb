import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '3px solid #000',
  textAlign: 'center'
};

const divHeight = {
  minHeight: 20,
  marginTop: 20
};

const aColor = {
  color: '#3cb371'
};

export default class extends React.Component {
  state = {
    value: '',
    results: [],
    total_results: 0,
    page_numbers: []
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  searchResult = async (title, page) => {
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
      this.setState({ results: [], total_results: 0, page_numbers: [] });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    let title = this.state.value;
    this.searchResult(title, 1);
  };

  goToPage = page_number => {
    let title = this.state.value;
    this.searchResult(title, page_number);
  };

  renderPageNumbers = total_results => {
    let pageNumberArray = [];
    for (let index = 0; index < total_results; index++) {
      pageNumberArray.push(index + 1);
    }
    return pageNumberArray;
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={layoutStyle}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>

        <h1>Search Results</h1>
        <h2>Found {this.state.total_results} results</h2>
        <ul>
          {this.state.results.map((result, i) => (
            <div style={divHeight} key={i}>
              <li>
                <Link href="/p/[id]" as={`/p/${result.imdbID}`}>
                  <a style={aColor}>{result.Title}</a>
                </Link>
              </li>
            </div>
          ))}
          <br />
          <br />
          {this.state.page_numbers.map(page_number => (
            <button onClick={e => this.goToPage(page_number)} key={page_number}>
              {page_number}
            </button>
          ))}
        </ul>
      </div>
    );
  }
}
