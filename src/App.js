import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => setRepositories(response.data));
  }, []);
  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Front end com React Native",
      url:
        "https://github.com/carlosrodrigues94/gostack_desafio_02_conceitos_de_nodejs",
      techs: ["NodeJs"],
      likes: 0,
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    setRepositories(response.data);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
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
