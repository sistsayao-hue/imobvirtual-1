import { useEffect, useState } from "react";
import "./Interessados.css";

const API_INTERESSADOS =
  "https://ctrmetodo.com.br/react/listarInteressados.php";

const Interessados = () => {

  const [interessados, setInteressados] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarInteressados = async () => {

    setCarregando(true);
    setErro("");

    try {

      const resposta = await fetch(API_INTERESSADOS);

      const texto = await resposta.text();

      console.log("RESPOSTA INTERESSADOS:", texto);

      let dados;

      try {
        dados = JSON.parse(texto);
      } catch {
        throw new Error(
          "O servidor não retornou um JSON válido."
        );
      }

      if (!resposta.ok || !dados.sucesso) {

        throw new Error(
          dados.mensagem ||
          "Não foi possível carregar os interessados."
        );
      }

      setInteressados(
        Array.isArray(dados.interessados)
          ? dados.interessados
          : []
      );

    } catch (error) {

      console.error(
        "ERRO AO LISTAR INTERESSADOS:",
        error
      );

      setErro(
        error.message ||
        "Erro ao carregar os interessados."
      );

    } finally {

      setCarregando(false);

    }
  };


  useEffect(() => {

    carregarInteressados();

  }, []);


  // ==========================================
  // WHATSAPP
  // ==========================================

  const chamarWhatsApp = (interessado) => {

    if (!interessado.telefone) {

      alert(
        "Este interessado não possui telefone cadastrado."
      );

      return;
    }


    // Mantém somente números
    let telefone = String(
      interessado.telefone
    ).replace(/\D/g, "");


    // Se tiver 10 ou 11 dígitos,
    // acrescenta código do Brasil
    if (
      telefone.length === 10 ||
      telefone.length === 11
    ) {

      telefone = "55" + telefone;

    }


    const nome =
      interessado.nome ||
      "cliente";


    const empreendimento =
      interessado.empreendimento ||
      "imóvel selecionado";


    const bairro =
      interessado.bairro ||
      "São Paulo";


    const mensagem =
      `Olá ${nome}! Aqui é da Imob Virtual. ` +
      `Recebemos seu interesse no imóvel ` +
      `${empreendimento}, localizado em ${bairro}. ` +
      `Gostaria de apresentar mais detalhes para você?`;


    const url =
      `https://wa.me/${telefone}?text=${encodeURIComponent(
        mensagem
      )}`;


    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };


  // ==========================================
  // DATA
  // ==========================================

  const formatarData = (data) => {

    if (!data) {
      return "-";
    }

    const partes = data.split(" ");

    if (partes.length < 1) {
      return data;
    }

    const dataParte = partes[0];

    const [ano, mes, dia] =
      dataParte.split("-");

    if (!ano || !mes || !dia) {
      return data;
    }

    return `${dia}/${mes}/${ano}`;
  };


  // ==========================================
  // FILTRO
  // ==========================================

  const interessadosFiltrados =
    interessados.filter((interessado) => {

      const termo =
        busca.toLowerCase().trim();

      if (!termo) {
        return true;
      }

      const texto = [

        interessado.nome,

        interessado.telefone,

        interessado.email,

        interessado.empreendimento,

        interessado.bairro,

        interessado.regiao

      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();


      return texto.includes(termo);

    });


  // ==========================================
  // CARREGANDO
  // ==========================================

  if (carregando) {

    return (
      <section className="interessados-container">

        <div className="interessados-cabecalho">

          <div>
            <span className="interessados-label">
              IMOB VIRTUAL
            </span>

            <h1>
              Interessados
            </h1>

            <p>
              Contatos recebidos através dos imóveis.
            </p>
          </div>

        </div>

        <div className="interessados-carregando">
          Carregando contatos...
        </div>

      </section>
    );
  }


  // ==========================================
  // TELA
  // ==========================================

  return (

    <section className="interessados-container">

      {/* =====================================
          CABEÇALHO
      ====================================== */}

      <div className="interessados-cabecalho">

        <div>

          <span className="interessados-label">
            IMOB VIRTUAL
          </span>

          <h1>
            Interessados
          </h1>

          <p>
            Contatos recebidos através dos imóveis.
          </p>

        </div>


        <button
          className="btn-atualizar-interessados"
          onClick={carregarInteressados}
          type="button"
        >
          ↻ ATUALIZAR
        </button>

      </div>


      {/* =====================================
          RESUMO
      ====================================== */}

      <div className="interessados-resumo">

        <div className="resumo-card">

          <span>
            TOTAL DE CONTATOS
          </span>

          <strong>
            {interessados.length}
          </strong>

        </div>


        <div className="resumo-card">

          <span>
            RESULTADOS
          </span>

          <strong>
            {interessadosFiltrados.length}
          </strong>

        </div>

      </div>


      {/* =====================================
          BUSCA
      ====================================== */}

      <div className="interessados-busca">

        <input
          type="text"
          placeholder="Buscar por nome, telefone ou imóvel..."
          value={busca}
          onChange={(e) =>
            setBusca(e.target.value)
          }
        />

      </div>


      {/* =====================================
          ERRO
      ====================================== */}

      {erro && (

        <div className="interessados-erro">

          <strong>
            Não foi possível carregar os contatos.
          </strong>

          <span>
            {erro}
          </span>

          <button
            type="button"
            onClick={carregarInteressados}
          >
            TENTAR NOVAMENTE
          </button>

        </div>

      )}


      {/* =====================================
          NENHUM CONTATO
      ====================================== */}

      {!erro &&
        interessadosFiltrados.length === 0 && (

          <div className="interessados-vazio">

            <div className="vazio-icone">
              ♡
            </div>

            <h2>
              Nenhum interessado encontrado
            </h2>

            <p>
              Os contatos recebidos através do
              formulário aparecerão aqui.
            </p>

          </div>

        )}


      {/* =====================================
          LISTA
      ====================================== */}

      <div className="lista-interessados">

        {interessadosFiltrados.map(
          (interessado) => (

            <article
              className="card-interessado"
              key={interessado.id}
            >

              {/* CABEÇALHO CARD */}

              <div className="card-interessado-topo">

                <div className="interessado-avatar">
                  {interessado.nome
                    ? interessado.nome
                        .charAt(0)
                        .toUpperCase()
                    : "?"}
                </div>


                <div className="interessado-identificacao">

                  <h2>
                    {interessado.nome ||
                      "Sem nome"}
                  </h2>

                  <span>
                    Interesse recebido em{" "}
                    {formatarData(
                      interessado.data_cadastro
                    )}
                  </span>

                </div>

              </div>


              {/* DADOS */}

              <div className="dados-interessado">

                <div className="dado-interessado">

                  <span className="dado-icone">
                    📱
                  </span>

                  <div>

                    <small>
                      WhatsApp / Telefone
                    </small>

                    <strong>
                      {interessado.telefone ||
                        "Não informado"}
                    </strong>

                  </div>

                </div>


                <div className="dado-interessado">

                  <span className="dado-icone">
                    ✉
                  </span>

                  <div>

                    <small>
                      E-mail
                    </small>

                    <strong>
                      {interessado.email ||
                        "Não informado"}
                    </strong>

                  </div>

                </div>

              </div>


              {/* IMÓVEL */}

              <div className="imovel-interessado">

                <span>
                  IMÓVEL DE INTERESSE
                </span>

                <strong>
                  {interessado.empreendimento ||
                    "Imóvel não identificado"}
                </strong>

                <p>

                  {interessado.bairro ||
                    interessado.regiao ||
                    "São Paulo"}

                  {interessado.m2
                    ? ` • ${interessado.m2} m²`
                    : ""}

                </p>

              </div>


              {/* AÇÃO */}

              <div className="acoes-interessado">

                <button
                  type="button"
                  className="btn-whatsapp"
                  onClick={() =>
                    chamarWhatsApp(interessado)
                  }
                >

                  <span>
                    💬
                  </span>

                  CHAMAR NO WHATSAPP

                </button>

              </div>

            </article>

          )
        )}

      </div>

    </section>
  );
};

export default Interessados;