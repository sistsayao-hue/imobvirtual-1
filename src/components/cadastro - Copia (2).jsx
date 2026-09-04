import { useState } from "react";
import { Link } from "react-router-dom";

import "./cadastro.css";

const Cadastro = () => {
  const [empreendimento, setEmpreendimento] = useState("");
  const [regiao, setRegiao] = useState("");
  const [bairro, setBairro] = useState("");
  const [m2, setM2] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [video, setVideo] = useState("");

  const [respostaPHP, setRespostaPHP] = useState("");

  // =========================
  // ESCOLHER VÍDEO
  // =========================

  const handleVideo = (event) => {
    const arquivo = event.target.files[0];

    if (arquivo) {
      setVideo(arquivo.name);

      console.log("VÍDEO:", arquivo.name);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // =========================
    // CRIA O JSON
    // =========================

    const dados = {
      empreendimento: empreendimento,
      regiao: regiao,
      bairro: bairro,
      m2: m2,
      preco: preco,
      descricao: descricao,
      video: video,
    };

    // =========================
    // MOSTRA O JSON
    // =========================

    setRespostaPHP(
      "JSON ENVIADO:\n\n" +
        JSON.stringify(dados, null, 2)
    );

    console.log("JSON ENVIADO:", dados);

    try {
      // =========================
      // ENVIA PARA O PHP
      // =========================

      const resposta = await fetch(
        "https://ctrmetodo.com.br/react/receber.php",
        {
          method: "POST",

          // Mantendo exatamente
          // o formato que você testou

          body: JSON.stringify(dados),
        }
      );

      // =========================
      // LÊ A RESPOSTA DO PHP
      // =========================

      const texto = await resposta.text();

      setRespostaPHP(
        "HTTP: " +
          resposta.status +
          "\n\n" +
          "RESPOSTA DO PHP:\n\n" +
          texto
      );

      console.log("RESPOSTA DO PHP:", texto);

    } catch (erro) {

      setRespostaPHP(
        "ERRO FETCH:\n\n" +
          erro.name +
          "\n\n" +
          erro.message
      );

      console.error("ERRO FETCH:", erro);
    }
  };

  return (
    <div className="pagina-cadastro">

      <header className="header-cadastro">

        <div className="marca">

          <div className="marca-simbolo">
            ◆
          </div>

          <div className="marca-texto">

            <h1>IMÓVEIS</h1>

            <span>
              CADASTRO DE IMÓVEIS
            </span>

          </div>

        </div>

      </header>


      <main className="area-cadastro">

        <h2 className="titulo-formulario">
          Cadastro de Apartamento
        </h2>


        <form
          className="formulario"
          onSubmit={handleSubmit}
        >

          {/* =========================
              EMPREENDIMENTO + REGIÃO
              ========================= */}

          <div className="linha-campos">

            <div className="campo">

              <label htmlFor="empreendimento">
                EMPREENDIMENTO
              </label>

              <input
                id="empreendimento"
                type="text"
                value={empreendimento}
                onChange={(event) =>
                  setEmpreendimento(event.target.value)
                }
                placeholder="Nome do empreendimento"
              />

            </div>


            <div className="campo">

              <label htmlFor="regiao">
                REGIÃO
              </label>

              <select
                id="regiao"
                value={regiao}
                onChange={(event) =>
                  setRegiao(event.target.value)
                }
              >

                <option value="">
                  Selecione a região
                </option>

                <option value="zona-sul">
                  Zona Sul
                </option>

                <option value="zona-oeste">
                  Zona Oeste
                </option>

                <option value="zona-norte">
                  Zona Norte
                </option>

              </select>

            </div>

          </div>


          {/* =========================
              BAIRRO + M²
              ========================= */}

          <div className="linha-campos">

            <div className="campo">

              <label htmlFor="bairro">
                BAIRRO
              </label>

              <input
                id="bairro"
                type="text"
                value={bairro}
                onChange={(event) =>
                  setBairro(event.target.value)
                }
                placeholder="Nome do bairro"
              />

            </div>


            <div className="campo">

              <label htmlFor="m2">
                M²
              </label>

              <input
                id="m2"
                type="number"
                min="1"
                value={m2}
                onChange={(event) =>
                  setM2(event.target.value)
                }
                placeholder="Ex: 85"
              />

            </div>

          </div>


          {/* =========================
              PREÇO
              ========================= */}

          <div className="linha-campos">

            <div className="campo">

              <label htmlFor="preco">
                PREÇO
              </label>

              <input
                id="preco"
                type="number"
                min="0"
                step="0.01"
                value={preco}
                onChange={(event) =>
                  setPreco(event.target.value)
                }
                placeholder="Ex: 2000000"
              />

            </div>

          </div>


          {/* =========================
              DESCRIÇÃO
              ========================= */}

          <div className="campo">

            <label htmlFor="descricao">
              DESCRIÇÃO DO IMÓVEL
            </label>

            <textarea
              id="descricao"
              value={descricao}
              onChange={(event) =>
                setDescricao(event.target.value)
              }
              placeholder="Digite as características do apartamento..."
            />

          </div>


          {/* =========================
              VÍDEO - ÚLTIMO CAMPO
              ========================= */}

          <div className="campo">

            <label htmlFor="video">
              VÍDEO
            </label>

            <input
              id="video"
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              onChange={handleVideo}
            />

            {video && (
              <p>
                Vídeo selecionado:{" "}
                <strong>{video}</strong>
              </p>
            )}

          </div>


          {/* =========================
              BOTÕES
              ========================= */}

          <div className="acoes">

            <Link
              to="/"
              className="voltar"
            >
              ← VOLTAR
            </Link>

            <button
              type="submit"
              className="bt"
            >
              ENVIAR JSON
            </button>

          </div>


          {/* =========================
              RESPOSTA DO PHP
              ========================= */}

          <pre className="resposta">
            {respostaPHP}
          </pre>

        </form>

      </main>

    </div>
  );
};

export default Cadastro;