import { useParams } from 'react-router-dom';
import { Header, RepoInfo, Issues } from './styles';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

import logo from '../../assets/logo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useEffect, useState } from 'react';
import { IGitHubRepository } from '../Dashboard';
interface RepositoryParams extends Record<string, string | undefined> {
  repository: string
}



export interface IExtendedGitHubRepository extends IGitHubRepository {
  stars: number;
  forks: number;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number
}

export interface IGitHubRepositoryIssue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  }  
}

const Repo: React.FC = ()  => {

  const [repositoryInfo, setRepositoryInfo] = useState<IExtendedGitHubRepository | null>(null)

  const [issues, setIssues] = useState<IGitHubRepositoryIssue[]>([])
  const {repository} = useParams<RepositoryParams>();  
  useEffect(() => {

    api.get(`repos/${repository?.replace('_','/')}`).then(response =>{
      setRepositoryInfo(response.data)      
    })

    api.get(`repos/${repository?.replace('_','/')}/issues`).then(response =>{
      setIssues(response.data)      
    })
  }, [repository])
  
  return (
    <>
    <Header>
      <img
        src={logo} alt='GitCollectio' />
        <FiChevronLeft />
        <Link to="/">Back</Link>
      </Header>
      {repositoryInfo && ( <RepoInfo>
        <header>
          <img src={repositoryInfo?.owner?.avatar_url} alt={repositoryInfo?.owner?.login}/>
          <div>
            <strong>{repositoryInfo?.full_name}</strong>  
            <p>{repositoryInfo?.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repositoryInfo?.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
          <strong>{repositoryInfo.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
          <strong>{repositoryInfo.open_issues_count}</strong>
            <span>Issues</span>
          </li>
        </ul>
      </RepoInfo> 
      )}
      
      <Issues>
        {issues.map(issue => (
          <a href={issue.html_url} key={issue.id}>
          <div>
            <strong>{issue.title}</strong>
            <p>{issue.user.login}</p>
          </div>

          <FiChevronRight size={20} />
          </a>
        ))}
      </Issues> 
    </>
  );
};
export default Repo;