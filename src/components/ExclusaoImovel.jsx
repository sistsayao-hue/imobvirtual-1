import { useEffect, useState } from "react";
import "./ExclusaoImovel.css";


const API_APARTAMENTOS =
  "https://ctrmetodo.com.br/react/listar.php";

const API_EXCLUIR =
  "https://ctrmetodo.com.br/react/excluir.php";

const Exclusao = () => {

  
  const [apartamentos, setApartamentos] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [imovelSelecionado, setImovelSelecionado] = useState(null);
  const [excluindo, setExcluindo] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const carregarApartamentos = async () => {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch(API_APARTAMENTOS);

      if (!resposta.ok) {
        throw new Error(
          `Servidor respondeu ${resposta.status}`
        );
      }

      const dados = await resposta.json();

      if (!Array.isArray(dados)) {
        throw new Error(
          "Formato de apartamentos inválido."
        );
      }

      console.log(
        "APARTAMENTOS RECEBIDOS:",
        dados
      );

      setApartamentos(dados);

    } catch (erro) {

      console.error(
        "ERRO AO CARREGAR:",
        erro
      );

      setErro(
        "Não foi possível carregar os imóveis."
      );

    } finally {

      setCarregando(false);

    }
  };

  useEffect(() => {
    carregarApartamentos();
  }, []);

  const formatarMoeda = (valor) => {

    if (
      valor === undefined ||
      valor === null ||
      valor === ""
    ) {
      return "R$ 0,00";
    }

    let texto = String(valor)
      .replace("R$", "")
      .replace(/\s/g, "")
      .trim();

    let numero;

    if (texto.includes(",")) {

      numero = Number(
        texto
          .replace(/\./g, "")
          .replace(",", ".")
      );

    } else {

      numero = Number(texto);

    }

    if (isNaN(numero)) {
      return String(valor);
    }

    return numero.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  const apartamentosFiltrados =
    apartamentos.filter(
      (apartamento) => {

        const nome =
          apartamento.empreendimento ||
          apartamento.nome ||
          "";

        return nome
          .toLowerCase()
          .includes(
            busca.toLowerCase()
          );
      }
    );

  const abrirConfirmacao = (apartamento) => {

    console.log(
      "================================"
    );

    console.log(
      "BOTÃO EXCLUIR FOI CLICADO"
    );

    console.log(
      "IMÓVEL SELECIONADO:",
      apartamento
    );

    console.log(
      "CÓDIGO:",
      apartamento.cod
    );

    console.log(
      "================================"
    );

    alert(
      `BOTÃO FUNCIONOU!\n\nImóvel: ${
        apartamento.empreendimento ||
        apartamento.nome ||
        "Sem nome"
      }\nCódigo: ${apartamento.cod}`
    );

    setMensagem("");

    setImovelSelecionado(
      apartamento
    );
  };

  const cancelarExclusao = () => {

    if (excluindo) {
      return;
    }

    setImovelSelecionado(null);

    setMensagem("");
  };

  const excluirImovel = async () => {

    console.log(
      "================================"
    );

    console.log(
      "BOTÃO CONFIRMAR EXCLUSÃO CLICADO"
    );

    console.log(
      "IMÓVEL:",
      imovelSelecionado
    );

    console.log(
      "================================"
    );

    if (!imovelSelecionado) {

      console.log(
        "NENHUM IMÓVEL SELECIONADO"
      );

      return;
    }

    const cod =
      imovelSelecionado.cod;

    console.log(
      "CÓDIGO QUE SERÁ ENVIADO:",
      cod
    );

    if (
      cod === undefined ||
      cod === null ||
      cod === ""
    ) {

      setMensagem(
        "O imóvel não possui código para exclusão."
      );

      return;
    }

    try {

      setExcluindo(true);

      setMensagem("");

      const formulario =
        new FormData();

      formulario.append(
        "cod",
        String(cod)
      );

      console.log(
        "ENVIANDO PARA:",
        API_EXCLUIR
      );

      console.log(
        "COD ENVIADO:",
        String(cod)
      );

      const resposta =
        await fetch(
          API_EXCLUIR,
          {
            method: "POST",
            body: formulario,
          }
        );

      console.log(
        "STATUS PHP:",
        resposta.status
      );

      const texto =
        await resposta.text();

      console.log(
        "RESPOSTA COMPLETA DO PHP:",
        texto
      );

      let dados;

      try {

        dados =
          JSON.parse(texto);

      } catch {

        throw new Error(
          "O PHP não retornou JSON válido."
        );

      }

      console.log(
        "DADOS DO PHP:",
        dados
      );

      if (!resposta.ok) {

        throw new Error(
          dados.mensagem ||
          `Servidor respondeu ${resposta.status}`
        );

      }

      if (!dados.sucesso) {

        throw new Error(
          dados.mensagem ||
          "Não foi possível excluir o imóvel."
        );

      }

      console.log(
        "IMÓVEL EXCLUÍDO COM SUCESSO:",
        cod
      );

      setApartamentos(
        (lista) =>
          lista.filter(
            (item) =>
              String(item.cod) !==
              String(cod)
          )
      );

      setImovelSelecionado(null);

      setMensagem(
        "Imóvel excluído com sucesso."
      );

 

    } catch (erro) {

      console.error(
        "ERRO AO EXCLUIR:",
        erro
      );

      setMensagem(
        erro.message ||
        "Erro ao excluir o imóvel."
      );

    } finally {

      setExcluindo(false);

    }
  };

  return (
    <div className="pagina-exclusao">

      <header className="header-exclusao">

        <div className="marca-exclusao">

          <div className="simbolo-exclusao">
            ◆
          </div>

          <div>

            <h1>
              IMÓVEIS
            </h1>

            <span>
              GERENCIAMENTO
            </span>

          </div>

        </div>

      </header>

      <main className="conteudo-exclusao">

        <section className="topo-exclusao">

          <div>

            <span className="etiqueta-exclusao">
              ADMINISTRAÇÃO
            </span>

            <h2>
              Gerenciar imóveis
            </h2>

            <p>
              Localize o imóvel que deseja excluir.
            </p>

          </div>

          <div className="contador-exclusao">

            <strong>
              {apartamentosFiltrados.length}
            </strong>

            <span>
              {apartamentosFiltrados.length === 1
                ? "IMÓVEL"
                : "IMÓVEIS"}
            </span>

          </div>

        </section>

        {mensagem &&
          !imovelSelecionado && (

            <div className="mensagem-sucesso">
              {mensagem}
            </div>

          )}

        <section className="painel-exclusao">

          <div className="pesquisa-exclusao">

            <span>
              🔍
            </span>

            <input
              type="text"
              value={busca}
              onChange={(event) =>
                setBusca(
                  event.target.value
                )
              }
              placeholder="Pesquisar imóvel..."
            />

            {busca && (

              <button
                type="button"
                onClick={() =>
                  setBusca("")
                }
              >
                ×
              </button>

            )}

          </div>

          <div className="cabecalho-lista-exclusao">

            <div>

              <h3>
                Imóveis cadastrados
              </h3>

              <p>
                Escolha o imóvel que deseja remover.
              </p>

            </div>

            <span>

              {apartamentosFiltrados.length}{" "}
              resultado
              {apartamentosFiltrados.length !== 1
                ? "s"
                : ""}

            </span>

          </div>

          {carregando && (

            <div className="mensagem-lista">

              <div className="spinner"></div>

              <p>
                Carregando imóveis...
              </p>

            </div>

          )}

          {!carregando &&
            erro && (

              <div className="mensagem-lista erro">

                <strong>
                  Erro
                </strong>

                <p>
                  {erro}
                </p>

              </div>

            )}

          {!carregando &&
            !erro &&
            apartamentosFiltrados.length === 0 && (

              <div className="mensagem-lista">

                <div className="icone-vazio">
                  🏠
                </div>

                <strong>
                  Nenhum imóvel encontrado
                </strong>

                <p>
                  Tente pesquisar por outro nome.
                </p>

              </div>

            )}

          {!carregando &&
            !erro &&
            apartamentosFiltrados.length > 0 && (

              <div className="lista-exclusao">

                {apartamentosFiltrados.map(
                  (apartamento) => {

                    const nome =
                      apartamento.empreendimento ||
                      apartamento.nome ||
                      "Imóvel sem nome";

                    const localizacao =
                      apartamento.localizacao ||
                      apartamento.bairro ||
                      apartamento.regiao ||
                      "Localização não informada";

                    const valor =
                      apartamento.preco ||
                      apartamento.valor ||
                      apartamento.valor_imovel ||
                      "";

                    return (

                      <article
                        className="item-exclusao"
                        key={apartamento.cod}
                      >

                        <div className="icone-imovel">
                          🏠
                        </div>

                        <div className="dados-imovel">

                          <h4>
                            {nome}
                          </h4>

                          <p>
                            {localizacao}
                          </p>

                          <span>
                            Código:{" "}
                            {apartamento.cod}
                          </span>

                        </div>

                        <div className="valor-imovel">

                          <small>
                            VALOR DO IMÓVEL
                          </small>

                          <strong>
                            {formatarMoeda(
                              valor
                            )}
                          </strong>

                        </div>

                        <div className="acao-imovel">

                          <button
                            type="button"
                            onClick={() =>
                              abrirConfirmacao(
                                apartamento
                              )
                            }
                          >
                            🗑

                            <span>
                              Excluir
                            </span>

                          </button>

                        </div>

                      </article>

                    );
                  }
                )}

              </div>

            )}

        </section>

      </main>

      {imovelSelecionado && (

        <div className="fundo-modal">

          <div className="modal-exclusao">

            <div className="icone-alerta">
              !
            </div>

            <h3>
              Excluir imóvel?
            </h3>

            <p className="texto-confirmacao">
              Você está prestes a excluir:
            </p>

            <div className="imovel-confirmacao">

              <strong>
                {imovelSelecionado.empreendimento ||
                  imovelSelecionado.nome ||
                  "Imóvel sem nome"}
              </strong>

              <span>
                Código:{" "}
                {imovelSelecionado.cod}
              </span>

              <span>
                {formatarMoeda(
                  imovelSelecionado.preco ||
                    imovelSelecionado.valor ||
                    imovelSelecionado.valor_imovel
                )}
              </span>

            </div>

            <p className="aviso-exclusao">
              Essa ação não poderá ser desfeita.
            </p>

            {mensagem && (

              <div className="erro-modal">
                {mensagem}
              </div>

            )}

            <div className="botoes-modal">

              <button
                type="button"
                className="botao-cancelar"
                onClick={cancelarExclusao}
                disabled={excluindo}
              >
                CANCELAR
              </button>

              <button
                type="button"
                className="botao-confirmar"
                onClick={() => {

                  alert(
                    "BOTÃO CONFIRMAR FUNCIONOU"
                  );

                  console.log(
                    "BOTÃO CONFIRMAR EXCLUSÃO CLICADO"
                  );

                  excluirImovel();

                }}
                disabled={excluindo}
              >
                {excluindo
                  ? "EXCLUINDO..."
                  : "EXCLUIR IMÓVEL"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Exclusao;