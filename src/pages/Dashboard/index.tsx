import React, { useState, useRef, useEffect} from 'react';
import {FiChevronRight} from 'react-icons/fi'
import { Title, Form, Repos, Error} from './styles'
import logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

export interface IGitHubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = ()  => {

  const [repos, setRepos] = useState<IGitHubRepository[]>(() => {
    const storageRepos = localStorage.getItem('@GitCollection:repositories')

    if(storageRepos){
      return JSON.parse(storageRepos);
    }
    return [];
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem('@GitCollection:repositories', JSON.stringify(repos))
  }, [repos])
  

  const handleAddRepo = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => 
  {
    event.preventDefault();
    if(inputRef?.current?.value === ''){
      setInputError('Set username/repository');
      return;
    }

    try{
      setInputError('');
      const response = await api.get<IGitHubRepository>(`repos/${inputRef?.current?.value}`);
      const repository = response.data;

      setRepos([...repos, repository]);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }catch {
      setInputError('Repository not found')
    }

  }
  return (
    <>
    <img src={logo} alt="GitCollection" />
    <Title>Repo Catalog Github</Title>

    <Form onSubmit={handleAddRepo} hasError={Boolean(inputError)}>
      <input type="text" ref={inputRef} />
      <button type='submit' > Search</button>
    </Form>

    {inputError && (<Error>{inputError}</Error>)}

    <Repos>
    {repos.map((repository, index) => (
      <Link to={`/repositories/${repository.full_name.replace('/', '_')}`} 
      className="href" key={repository.full_name + index}>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <div>
          <strong>{repository.full_name}</strong>
          <p>{repository.description}</p>
        </div>
        <FiChevronRight size={20} />
      </Link>
    ))}
  </Repos>
   </>
  );
}


export default Dashboard;