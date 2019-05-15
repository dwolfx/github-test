import React, { Component } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Repo from "./Repo";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      github: {
        url: "https://api.github.com/users",
        client_id: "b2c9beb52740822e0792",
        client_secret: "69c20e7a5f4a88d5b3edd574f5a6aa39442da98a",
        count: 7,
        sort: "created: asc"
      },
      user: {},
      repos: [],
      commits: []
    };
  }

  getUser = e => {
    const user = e.target.value;

    const { url, client_id, client_secret, count, sort } = this.state.github;
    axios
      .get(
        `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
      )
      .then(({ data }) => this.setState({ user: data }));

    axios
      .get(
        `${url}/${user}/repos?&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
      )
      .then(({ data }) => this.setState({ repos: data }));
  };
  renderProfile = () => {
    const { user } = this.state;
    return (
      <div className="row">
        <div className="col-md-12">
          <Profile user={user} />
        </div>
      </div>
    );
  };

  contentLoad = () => {
    console.log("victor----");
  };

  renderRepos = () => {
    const { repos } = this.state;

    return (
      <div className="col-md-12">
        {repos.map(repo => (
          <Repo
            key={repo.name}
            repo={repo}
            loadCommits={this.getCommits(repo.name)}
          />
        ))}
      </div>
    );
  };

  getCommits = repo => () => {
    const {
      github: { url },
      user
    } = this.state;

    axios
      .get(`https://api.github.com/repos/${user.login}/${repo}/commits`)
      .then(({ data }) => this.setState({ commits: data, repos: [] }));
  };

  renderCommits = () => {
    const { commits } = this.state;
    console.log(commits);

    return (
      <div>
        {commits.map(item => (
          <div key={item.sha}>
            <p>{item.commit.message}</p>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { user, commits, repos } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-3 ">
              <div className="col-md-12 card-body md-2">
                <h1>User</h1>
                <input
                  onChange={this.getUser}
                  id="search"
                  type="text"
                  className="from-control"
                  require
                />
              </div>
              {user && this.renderProfile()}
            </div>
            <div className="col-md-9">
              {repos.length > 0 && this.renderRepos()}
              {commits.length > 0 && repos.length === 0 && this.renderCommits()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
