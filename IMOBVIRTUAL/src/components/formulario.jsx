import "./formulario.css";

const Formulario = () => {
  return (
    <div className="formulario">

      <h1>Cadastro de apartamentos</h1>

      <div className="campo">
        <label htmlFor="nome">
          Nome
        </label>

        <input
          className="for"
          id="nome"
          type="text"
        />
      </div>

      <div className="campo">
        <label htmlFor="regiao">
          Região
        </label>

        <input
          className="for"
          id="regiao"
          type="text"
        />
      </div>

      <div className="campo">
        <label htmlFor="bairro">
          Bairro
        </label>

        <input
          className="for"
          id="bairro"
          type="text"
        />
      </div>

      <div className="campo">
        <label htmlFor="metros">
          m²
        </label>

        <input
          className="for"
          id="metros"
          type="text"
        />
      </div>

      <div className="campo">
        <label htmlFor="valor">
          Valor
        </label>

        <input
          className="for"
          id="valor"
          type="text"
        />
      </div>

      <button  className="btao">subir</button>

    </div>
  );
};

export default Formulario;