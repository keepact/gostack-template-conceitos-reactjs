import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const loadRepos = async () => {
      const { data: repositoryList } = await api.get('repositories', {
      });
      setRepositories(repositoryList);
    }
    loadRepos();
  }, []);

  const handleAddRepository = async () => {
    const { data: repository } = await api.post('repositories', {
      title: `Repository ${Date.now()}`,
      url: 'http://github.com',
      techs: [
        'ReactJS', 'ReactNative', 'NodeJS'
      ]
    });

    setRepositories([...repositories, repository]);
  }

  const handleRemoveRepository = async id => {
    await api.delete(`repositories/${id}`);

    const updatedRepos = repositories.filter(repo => repo.id !== id);
    
    setRepositories(updatedRepos);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map(repo => (
          <li key={repo.id}>
              <h2>{repo.title}</h2>
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
