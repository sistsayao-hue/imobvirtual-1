
import { Routes, Route, Link } from "react-router-dom";

import ListCard from "./components/listcard.jsx";
import Filtro from "./components/filtro";
import Cadastro from "./components/cadastro";
import Formulario from "./components/formulario";
import Saida from "./components/saida";
import Teste from "./components/teste";
import Receber from "./components/receber";

import "./App.css";


// ========================================
// PÁGINA INICIAL
// ========================================

const Inicio = () => {

  return (
    <div>

      <h1>Setor Imobiliário - lançamentos</h1>

      <hr />

      {/* FILTRO */}

      <Filtro />


      {/* ========================================
          LISTA DE IMÓVEIS
          TEMPORARIAMENTE SEM FETCH
      ======================================== */}

      <ListCard produtos={[]} />


      {/* ========================================
          MENU
      ======================================== */}

      <div className="links-menu">

        <Link
          className="link-cadastro"
          to="/cadastro"
        >
          CADASTRO
        </Link>


        <Link
          className="link-formularioc"
          to="/formulario"
        >
          FORMULARIO
        </Link>


        <Link
          className="link-formularioc"
          to="/saida"
        >
          Saida
        </Link>


        <Link
          className="link-formularioc"
          to="/teste"
        >
          Teste
        </Link>


        <Link
          className="link-formularioc"
          to="/receber"
        >
          Receber
        </Link>

      </div>

    </div>
  );
};


// ========================================
// APP PRINCIPAL
// ========================================

const App = () => {

  return (
    <Routes>

      <Route
        path="/"
        element={<Inicio />}
      />

      <Route
        path="/cadastro"
        element={<Cadastro />}
      />

      <Route
        path="/formulario"
        element={<Formulario />}
      />

      <Route
        path="/saida"
        element={<Saida />}
      />

      <Route
        path="/teste"
        element={<Teste />}
      />

      <Route
        path="/receber"
        element={<Receber />}
      />

    </Routes>
  );
};


export default App;

