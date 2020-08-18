import React from "react";
import api from "./services/api"

import "./styles.css";

function App() {
  const [projects,setProjects] = React.useState([]);

  React.useEffect(()=>{
    api.get('/repositories').then((response)=>{
      setProjects(response.data)
    })
  },[])

  async function handleAddRepository() {
    let lengthProjects = projects.length
    const repository = {
      title: `Desafio ${lengthProjects + 1} GoStack13`,
      url:"https://github.com/JonatasRodriguesReis/GoStack13-desafio-conceitos-nodejs",
      techs:["Nodejs","JavaScript"]
    }

    api.post('/repositories',repository).then((response)=>{
      setProjects([...projects,response.data])
    })
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = projects.findIndex((project)=>project.id === id)
    const projectsCopy = Object.assign([],projects) 
    api.delete(`/repositories/${id}`).then((response)=>{
       projectsCopy.splice(repositoryIndex,1)
       setProjects(projectsCopy)
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
      { projects.map((project)=>
            <li key={project.id}>
              {project.title}
    
              <button onClick={() => handleRemoveRepository(project.id)}>
                Remover
              </button>
          </li>
          )
        } 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
