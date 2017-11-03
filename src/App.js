import React, {Component} from "react";
import BlastForm from "./BlastForm";
import BlastLoadingContainer from "./BlastLoadingContainer";
import RecentJobs from './RecentJobs';
import $ from 'jquery';
import 'foundation-sites/dist/css/foundation.min.css';
import 'foundation-sites'
import "./App.css";

class App extends Component {

  constructor() {
    super();
    this.state = {
      sequence: '',
      database: ''
    }
    this.handleFormSubmission = this
      .handleFormSubmission
      .bind(this);
  }

  componentDidMount() {
    $(window).foundation();
  }

  handleFormSubmission(sequence) {
    this.setState({sequence: sequence});
  }

  render() {
    const isSubmitted = (this.state.sequence && this.state.sequence.length !== 0);
    return (
      <div className="grid-x grid-margin-x">
        <header className="top-bar cell">
          <span className="App-title">UniProt</span>
          <div className="top-bar-right">
            <ul className="menu">
              <li>
                <input type="search" placeholder="Search"/>
              </li>
              <li>
                <button type="button" className="button">Search</button>
              </li>
            </ul>
          </div>
        </header>
        <div className="cell grid-x grid-margin-x">
          <div className="cell">
            <h1>BLAST</h1>
          </div>
          <div className="cell small-2">
            <RecentJobs/>
          </div>
          <div className="cell auto">
            {!isSubmitted
              ? (<BlastForm onFormSubmit={this.handleFormSubmission}/>)
              : (<BlastLoadingContainer sequence={this.state.sequence}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;