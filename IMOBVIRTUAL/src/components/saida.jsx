import { useEffect, useState } from "react";
import "./saida.css";

function Saida() {
  const [apartamentos, setApartamentos] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      alert("Passaram 3 minutos");
    }, 6000);

    fetch(
      "https://ctrmetodo.com.br/Imoveis/APARTAMENTOS/selecao.php"
    )
      .then((resposta) => resposta.json())
      .then((dados) => {
        console.log("DADOS RECEBIDOS DO PHP:");
        console.log(dados);

        setApartamentos(dados.apartamentos);
      })
      .catch((erro) => {
        console.log("Erro:", erro);
        alert("ERRO FETCH: " + erro.message);
      });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="saida">

      <h1 className="titulo-saida">
        Apartamentos
      </h1>

      <div className="lista-apartamentos">

        {apartamentos.map((apartamento) => (

          <div
            className="card-apartamento"
            key={apartamento.cod}
          >

            <div className="video-container">

              {apartamento.video ? (
                <video
                  controls
                  muted
                  loop
                  playsInline
                >
                  <source
                    src={apartamento.video}
                    type="video/mp4"
                  />

                  Seu navegador não suporta vídeo.
                </video>
              ) : (
                <div className="sem-video">
                  Sem vídeo disponível
                </div>
              )}

            </div>

            <div className="informacoes">

              <h2>
                {apartamento.empreendimento}
              </h2>

              <p>
                <strong>Localização:</strong>{" "}
                {apartamento.bairro}
              </p>

              <p>
                <strong>Região:</strong>{" "}
                {apartamento.regiao}
              </p>

              <p>
                <strong>m²:</strong>{" "}
                {apartamento.m2}
              </p>

              <p className="preco">
                R$ {apartamento.preco}
              </p>

              <p>
                {apartamento.descricao}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Saida;