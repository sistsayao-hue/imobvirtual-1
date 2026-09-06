
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ListCard from "./components/listcard.jsx";
import Filtro from "./components/filtro.jsx";
import Cadastro from "./components/cadastro.jsx";
import Formulario from "./components/formulario.jsx";
import Saida from "./components/saida.jsx";
import Teste from "./components/teste.jsx";
import Receber from "./components/receber.jsx";
import "./App.css";
import Financiamento from "./components/financiamento.jsx";
import AreaNegocios from "./components/AreaNegocios.jsx";


const API = "https://ctrmetodo.com.br/react/listar.php";

function formatarPreco(valor) {
  if (valor === undefined || valor === null || valor === "") return "Consulte";
  const texto = String(valor);
  if (texto.toLowerCase().includes("r$")) return texto;
  const numero = Number(String(valor).replace(/\./g, "").replace(",", "."));
  if (!Number.isNaN(numero)) {
    return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
  return texto;
}

const Inicio = () => {
  const [apartamentos, setApartamentos] = useState([]);
  const [apartamentosFiltrados, setApartamentosFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [fonte, setFonte] = useState("online");
  const [erro, setErro] = useState("");

 

  const [valorImovel, setValorImovel] = useState("");

  useEffect(() => {
    let ativo = true;

    const carregar = async () => {
      try {
        const resposta = await fetch(API);
        if (!resposta.ok) throw new Error(`Servidor respondeu ${resposta.status}`);
        const dados = await resposta.json();
        if (!Array.isArray(dados)) throw new Error("Formato de dados inválido.");
        if (ativo) {
          setApartamentos(dados);
          setApartamentosFiltrados([]);
        }
      } catch (erroOnline) {
        console.warn("API online indisponível. Usando catálogo local.", erroOnline);
        try {
          const respostaLocal = await fetch(`${import.meta.env.BASE_URL}apartamentos.json`);
          if (!respostaLocal.ok) throw new Error("Catálogo local não encontrado.");
          const dadosLocais = await respostaLocal.json();
          if (!Array.isArray(dadosLocais)) throw new Error("Catálogo local inválido.");
          if (ativo) {
            setApartamentos(dadosLocais);
            setApartamentosFiltrados([]);
            setFonte("local");
            setErro("");
          }
        } catch (erroLocal) {
          if (ativo) setErro("Não foi possível carregar o catálogo de imóveis.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    };

    carregar();
    return () => { ativo = false; };
  }, []);

  return (
    <main className="pagina-inicial">
      <header className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="barra-topo">
          <Link className="logo" to="/" aria-label="ImobVirtual início">
            <span className="logo-mark">IV</span>
            <span>
              <strong>IMOBVIRTUAL</strong>
              <small>EXPERIÊNCIA IMOBILIÁRIA</small>
            </span>
          </Link>
          <nav className="menu-principal" aria-label="Navegação principal">
            <Link to="/">Imóveis</Link>
            <Link to="/cadastro">Cadastrar imóvel</Link>
            <Link to="/financiamento">
  Marketing
</Link>
          </nav>
        </div>

        <div className="hero-conteudo">
          <div className="hero-texto">
            <span className="eyebrow">CURADORIA • ELEGÂNCIA • CONFIANÇA</span>
            <h1>Encontre um lugar<br /><em>à altura dos seus planos.</em></h1>
            <p>Uma vitrine moderna para descobrir apartamentos e oportunidades selecionadas em São Paulo.</p>
            <a className="hero-cta" href="#catalogo">Explorar imóveis <span>↓</span></a>
          </div>
          <div className="hero-selo" aria-hidden="true">
            <span>IMÓVEIS</span>
            <strong>SELECIONADOS</strong>
            <small>PARA VOCÊ</small>
          </div>
        </div>
      </header>

      <section className="resumo">
        <div><strong>{apartamentos.length}</strong><span>imóveis no catálogo</span></div>
        <div><strong>SP</strong><span>São Paulo & região</span></div>
        <div><strong>24h</strong><span>acesso à sua vitrine</span></div>
      </section>

      <section id="catalogo" className="catalogo">
        <div className="secao-titulo">
          <div>
            <span className="eyebrow">CATÁLOGO IMOBVIRTUAL</span>
            <h2>Escolha o seu próximo endereço</h2>
          </div>
          <span className="status">
            <i /> {fonte === "online" ? "Catálogo atualizado" : "Modo catálogo"}
          </span>
        </div>

        <Filtro apartamentos={apartamentos} setApartamentosFiltrados={setApartamentosFiltrados} />

        {carregando && <p className="estado">Preparando seu catálogo...</p>}

        {erro && (
          <div className="mensagem-erro">
            <strong>Não foi possível carregar os imóveis</strong>
            <span>{erro}</span>
          </div>
        )}

        {!carregando && !erro && apartamentosFiltrados.length === 0 && (
          <p className="estado">Nenhum imóvel corresponde aos filtros escolhidos.</p>
        )}

        <ListCard produtos={apartamentosFiltrados} formatarPreco={formatarPreco} />
      </section>

      <footer className="rodape">
        <div>
          <strong>IMOBVIRTUAL</strong>
          <span>Uma apresentação elegante para bons negócios.</span>
        </div>
        <Link to="/cadastro">Cadastrar novo imóvel →</Link>
      </footer>
    </main>
  );
};

const App = () => (
  <Routes>
    <Route path="/" element={<Inicio />} />
    <Route path="/cadastro" element={<Cadastro />} />
    <Route path="/formulario" element={<Formulario />} />
    <Route path="/saida" element={<Saida />} />
    <Route path="/teste" element={<Teste />} />
    <Route path="/receber" element={<Receber />} />
<Route path="/financiamento" element={<Financiamento />} />
<Route path="/area-negocios" element={<AreaNegocios />} />


  </Routes>
);

export default App;
