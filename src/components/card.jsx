
import { useState } from "react";
import "./card.css";
import TenhoInteresse from "./TenhoInteresse";

const Card = ({ produto }) => {

  const [mostrarInteresse, setMostrarInteresse] = useState(false);

  const arquivo = produto.video || produto.imagem || "";

  const urlArquivo = arquivo
    ? arquivo.startsWith("http")
      ? arquivo
      : `https://ctrmetodo.com.br/Fotografias/${arquivo}`
    : "";

  const extensao =
    arquivo.split(".").pop()?.toLowerCase() || "";

  const ehVideo = ["mp4", "webm", "ogg"].includes(extensao);

  const ehImagem = [
    "png",
    "jpg",
    "jpeg",
    "webp",
    "gif",
  ].includes(extensao);

  const bairro =
    produto.bairro ||
    produto.localizacao ||
    "São Paulo";

  // =========================================
  // FORMATAÇÃO DO PREÇO
  // =========================================

  const formatarPreco = (valor) => {

    if (
      valor === undefined ||
      valor === null ||
      valor === ""
    ) {
      return "Consulte";
    }

    let texto = String(valor).trim();

    // Remove R$ e espaços
    texto = texto.replace(/R\$\s?/gi, "");

    /*
      Se vier no formato brasileiro:

      480.000,00
      1.398.000,00

      transforma para:

      480000.00
      1398000.00
    */

    if (texto.includes(",")) {

      texto = texto
        .replace(/\./g, "")
        .replace(",", ".");

    } else {

      /*
        Se não tiver vírgula, mantém o número.
        Exemplo:
        480000
        1398000
        6000000
      */

      texto = texto.replace(/[^\d.-]/g, "");

    }

    const numero = Number(texto);

    if (!Number.isNaN(numero)) {

      return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

    }

    return "Consulte";
  };

  // =========================================
  // CARD
  // =========================================

  return (
    <>
      <article className="cartao">

        {/* ================================
            IMAGEM / VÍDEO
        ================================= */}

        <div className="cartao-media">

          {ehVideo && (
            <video
              className="take"
              controls
              preload="metadata"
            >
              <source
                src={urlArquivo}
                type={`video/${extensao}`}
              />
            </video>
          )}

          {ehImagem && (
            <img
              className="take"
              src={urlArquivo}
              alt={
                produto.empreendimento ||
                "Imóvel"
              }
            />
          )}

          {!arquivo && (
            <div className="sem-arquivo">

              <span className="casa-icone">
                ⌂
              </span>

              <small>
                IMÓVEL SELECIONADO
              </small>

              <strong>
                {bairro}
              </strong>

            </div>
          )}

          <span className="tag-imovel">
            {produto.regiao || "SP"}
          </span>

        </div>

        {/* ================================
            CORPO DO CARD
        ================================= */}

        <div className="cartao-corpo">

          <p className="localizacao">
            ● {bairro}
          </p>

          <h2>
            {produto.empreendimento ||
              "Apartamento"}
          </h2>

          {/* ================================
              DESCRIÇÃO
          ================================= */}

          <div className="descricao-area">

            {produto.descricao ? (

              <p className="descricao">
                {produto.descricao}
              </p>

            ) : (

              <p className="descricao vazio">
                &nbsp;
              </p>

            )}

          </div>

          {/* ================================
              DETALHES
          ================================= */}

          <div className="detalhes">

            {produto.m2 && (
              <span>
                <b>{produto.m2}</b> m²
              </span>
            )}

            <span>
              <b>Residencial</b>
            </span>

          </div>

          {/* ================================
              RODAPÉ
          ================================= */}

          <div className="cartao-rodape">

            <span>
              Valor do imóvel
            </span>

            <strong>
              {formatarPreco(produto.preco)}
            </strong>

            <button
              type="button"
              className="botao-interesse"
              onClick={() =>
                setMostrarInteresse(true)
              }
            >
              TENHO INTERESSE
            </button>

          </div>

        </div>

      </article>

      {/* =====================================
          FORMULÁRIO TENHO INTERESSE
      ====================================== */}

      {mostrarInteresse && (
        <TenhoInteresse
          imovel={produto}
          onFechar={() =>
            setMostrarInteresse(false)
          }
        />
      )}

    </>
  );
};

export default Card;
