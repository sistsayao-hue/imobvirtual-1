
import "./filtro.css";

const Filtro = ({ regiao, setRegiao }) => {
  return (
    <div className="filtros">

      <select
        value={regiao}
        onChange={(event) => setRegiao(event.target.value)}
      >
        <option value="">Região</option>
        <option value="Oeste">Zona Oeste</option>
        <option value="Sul">Zona Sul</option>
        <option value="zona-norte">Zona Norte</option>
        <option value="zona-norte">Zona Leste</option>
      </select>

      <select>
        <option value="">Bairro</option>
        <option value="pinheiros">Pinheiros</option>
        <option value="moema">Moema</option>
        <option value="vila-madalena">Vila Madalena</option>
      </select>

      <select>
        <option value="">Valor máximo</option>
        <option value="500000">R$ 500.000</option>
        <option value="800000">R$ 800.000</option>
        <option value="1000000">R$ 1.000.000</option>
      </select>

      <select>
        <option value="">m² mínimo</option>
        <option value="50">50 m²</option>
        <option value="80">80 m²</option>
        <option value="100">100 m²</option>
      </select>

      <button type="button">
        Filtrar imóveis
      </button>

    </div>
  );
};

export default Filtro;

