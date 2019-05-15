import React from 'react'
import CommitList from './Comit'

function testCommit(e){
  e.preventDefault();
  console.log('entrou')
}
const Repo = ({repo}) => (
  <div className="card card-body mb-2">
    <div className="row">
      <div className="col-md-6" onClick={testCommit}>
        <p>{repo.name}</p>
      </div>
      <div className="col-md-6">
        <span className="badge badge-primary">Stars: { repo.stargazers_count }</span>
        <span className="badge badge-secondary">Watch: { repo.watchers_count }</span>
        <span className="badge badge-success">Forks: { repo.forks_count }</span>
      </div>
    </div>
  </div>
)
export default Repo