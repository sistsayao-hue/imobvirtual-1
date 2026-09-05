import { useEffect, useMemo, useState } from "react";
import "./filtro.css";

const Filtro = ({ apartamentos, setApartamentosFiltrados }) => {
  const [regiao, setRegiao] = useState("");
  const [bairro, setBairro] = useState("");
  const [valorMaximo, setValorMaximo] = useState("");
  const [m2Minimo, setM2Minimo] = useState("");

  const regioes = useMemo(() => [...new Set(apartamentos.map((item) => item.regiao).filter(Boolean))], [apartamentos]);
  const bairros = useMemo(() => [...new Set(
    apartamentos
      .filter((item) => !regiao || item.regiao?.toLowerCase() === regiao.toLowerCase())
      .map((item) => item.bairro || item.localizacao)
      .filter(Boolean)
  )], [apartamentos, regiao]);

  useEffect(() => {
    let resultado = [...apartamentos];

    if (regiao) resultado = resultado.filter((item) => item.regiao?.toLowerCase() === regiao.toLowerCase());
    if (bairro) resultado = resultado.filter((item) => (item.bairro || item.localizacao)?.toLowerCase() === bairro.toLowerCase());

    if (valorMaximo) {
      const limite = Number(valorMaximo);
      resultado = resultado.filter((item) => {
        const numero = Number(String(item.preco ?? "").replace(/[^0-9,.-]/g, "").replace(/\./g, "").replace(",", "."));
        return Number.isNaN(numero) ? true : numero <= limite;
      });
    }

    if (m2Minimo) {
      resultado = resultado.filter((item) => Number(item.m2) >= Number(m2Minimo));
    }

    setApartamentosFiltrados(resultado);
  }, [apartamentos, regiao, bairro, valorMaximo, m2Minimo, setApartamentosFiltrados]);

  const limparFiltros = () => {
    setRegiao(""); setBairro(""); setValorMaximo(""); setM2Minimo("");
  };

  return (
    <section className="filtro-area" aria-label="Filtros de imóveis">
      <div className="filtro-titulo">
        <div>
          <span>BUSCA INTELIGENTE</span>
          <h3>Refine sua escolha</h3>
        </div>
        <button type="button" onClick={limparFiltros}>Limpar filtros</button>
      </div>

      <div className="filtros">
        <div className="campo-filtro">
          <label htmlFor="regiao">Região</label>
          <select id="regiao" value={regiao} onChange={(e) => { setRegiao(e.target.value); setBairro(""); }}>
            <option value="">Todas as regiões</option>
            {regioes.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <div className="campo-filtro">
          <label htmlFor="bairro">Bairro</label>
          <select id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)}>
            <option value="">Todos os bairros</option>
            {bairros.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <div className="campo-filtro">
          <label htmlFor="valor">Valor máximo</label>
          <input id="valor" type="number" min="0" placeholder="Ex.: 2.000.000" value={valorMaximo} onChange={(e) => setValorMaximo(e.target.value)} />
        </div>

        <div className="campo-filtro">
          <label htmlFor="area">Área mínima</label>
          <input id="area" type="number" min="0" placeholder="Ex.: 80 m²" value={m2Minimo} onChange={(e) => setM2Minimo(e.target.value)} />
        </div>
      </div>
    </section>
  );
};

export default Filtro;
