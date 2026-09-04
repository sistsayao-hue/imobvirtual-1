import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ListCard from "./components/ListCard";
import apartamentos from "./data/apartamentos";
import Filtro from "./components/filtro";
import Cadastro from "./components/cadastro";
import Formulario from "./components/formulario";
import Saida from "./components/saida";
import Teste from "./components/teste";
import Receber from "./components/receber";
import "./App.css";



const Inicio = () => {
  const [regiao, setRegiao] = useState("");

  const apartamentosFiltrados = apartamentos.filter((apartamento) => {
    if (regiao === "") {
      return false;
    }

    return apartamento.regiao === regiao;
  });

  return (
    <div>
      <h1>Setor Imobiliário - lançamentos</h1>

      <hr />

      <Filtro
        regiao={regiao}
        setRegiao={setRegiao}
      />

      <ListCard produtos={apartamentosFiltrados} />

<div className="links-menu">

      <Link className="link-cadastro" to="/cadastro">
        CADASTRO
      </Link>

      <Link className="link-formularioc" to="/formulario">
        FORMULARIO
      </Link>


      <Link className="link-formularioc" to="/saida">
        Saida
      </Link>


   <Link className="link-formularioc" to="/teste">
        Teste
      </Link>

       <Link className="link-formularioc" to="/receber">
        Receber
      </Link>


</div>

    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />

      <Route path="/cadastro" element={<Cadastro />} />

      <Route path="/formulario" element={<Formulario />} />

<Route path="/saida" element={<Saida />} />
<Route path="/teste" element={<Teste />} />
<Route path="/receber" element={<Receber />} /> 


    </Routes>
  );
};

export default App;