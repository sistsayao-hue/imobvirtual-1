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

  // Foto ou vídeo
  const [video, setVideo] = useState(null);

  const [respostaPHP, setRespostaPHP] = useState("");

  // ==========================================
  // ESCOLHER FOTO OU VIDEO
  // ==========================================

  const handleVideo = (event) => {
    const arquivo = event.target.files[0];

    if (arquivo) {
      setVideo(arquivo);

      console.log("ARQUIVO SELECIONADO");
      console.log("Nome:", arquivo.name);
      console.log("Tipo:", arquivo.type);
      console.log("Tamanho:", arquivo.size);
    }
  };

  // ==========================================
  // ENVIAR
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ========================================
    // FORMDATA
    // ========================================

    const formulario = new FormData();

    formulario.append(
      "empreendimento",
      empreendimento
    );

    formulario.append(
      "regiao",
      regiao
    );

    formulario.append(
      "bairro",
      bairro
    );

    formulario.append(
      "m2",
      m2
    );

    formulario.append(
      "preco",
      preco
    );

    formulario.append(
      "descricao",
      descricao
    );

    // ========================================
    // FOTO OU VIDEO
    // ========================================

    if (video) {
      formulario.append(
        "video",
        video
      );
    }

    // ========================================
    // MOSTRAR NO CONSOLE
    // ========================================

    console.log(
      "EMPREENDIMENTO:",
      empreendimento
    );

    console.log(
      "REGIAO:",
      regiao
    );

    console.log(
      "BAIRRO:",
      bairro
    );

    console.log(
      "M2:",
      m2
    );

    console.log(
      "PRECO:",
      preco
    );

    console.log(
      "DESCRICAO:",
      descricao
    );

    console.log(
      "ARQUIVO:",
      video
    );

    setRespostaPHP(
      "ENVIANDO...\n\n" +
      "Arquivo: " +
      (video ? video.name : "Nenhum arquivo selecionado")
    );

    // ========================================
    // FETCH
    // ========================================

    try {

      const resposta = await fetch(
        "https://ctrmetodo.com.br/react/receber.php",
        {
          method: "POST",
          body: formulario,
        }
      );

      const texto = await resposta.text();

      console.log(
        "HTTP:",
        resposta.status
      );

      console.log(
        "RESPOSTA DO PHP:",
        texto
      );

      setRespostaPHP(
        "HTTP: " +
        resposta.status +
        "\n\n" +
        "RESPOSTA DO PHP:\n\n" +
        texto
      );

    } catch (erro) {

      console.error(
        "ERRO FETCH:",
        erro
      );

      setRespostaPHP(
        "ERRO FETCH:\n\n" +
        erro.name +
        "\n\n" +
        erro.message
      );
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

            <h1>
              IMÓVEIS
            </h1>

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

          {/* ================================= */}
          {/* EMPREENDIMENTO / REGIAO */}
          {/* ================================= */}

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
                  setEmpreendimento(
                    event.target.value
                  )
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
                  setRegiao(
                    event.target.value
                  )
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


          {/* ================================= */}
          {/* BAIRRO / M2 */}
          {/* ================================= */}

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
                  setBairro(
                    event.target.value
                  )
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
                  setM2(
                    event.target.value
                  )
                }
                placeholder="Ex: 85"
              />

            </div>

          </div>


          {/* ================================= */}
          {/* PRECO */}
          {/* ================================= */}

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
                  setPreco(
                    event.target.value
                  )
                }
                placeholder="Ex: 2000000"
              />

            </div>

          </div>


          {/* ================================= */}
          {/* DESCRICAO */}
          {/* ================================= */}

          <div className="campo">

            <label htmlFor="descricao">
              DESCRIÇÃO DO IMÓVEL
            </label>

            <textarea
              id="descricao"
              value={descricao}
              onChange={(event) =>
                setDescricao(
                  event.target.value
                )
              }
              placeholder="Digite as características do apartamento..."
            />

          </div>


          {/* ================================= */}
          {/* FOTO OU VIDEO */}
          {/* ================================= */}

          <div className="campo">

            <label htmlFor="video">
              FOTO OU VÍDEO
            </label>

            <input
              id="video"
              type="file"
              accept="image/*,video/*"
              onChange={handleVideo}
            />

            {video && (
              <p>
                Arquivo selecionado:{" "}
                <strong>
                  {video.name}
                </strong>
              </p>
            )}

          </div>


          {/* ================================= */}
          {/* ACOES */}
          {/* ================================= */}

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
              ENVIAR CADASTRO
            </button>

          </div>


          {/* ================================= */}
          {/* RESPOSTA PHP */}
          {/* ================================= */}

          <pre className="resposta">
            {respostaPHP}
          </pre>


        </form>

      </main>

    </div>
  );
};

export default Cadastro;