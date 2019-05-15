import React from "react";
import CommitList from "./Comit";

const Repo = ({ repo, loadCommits }) => (
  <div className="card card-body mb-2">
    <div className="row">
      <div className="col-md-6" onClick={loadCommits}>
        <p>{repo.name}</p>
      </div>
      <div className="col-md-6">
        <span className="badge badge-primary">
          Stars: {repo.stargazers_count}
        </span>
        <span className="badge badge-secondary">
          Watch: {repo.watchers_count}
        </span>
        <span className="badge badge-success">Forks: {repo.forks_count}</span>
      </div>
    </div>
  </div>
);
export default Repo;
