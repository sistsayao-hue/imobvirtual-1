import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./financiamento.css";

const API_APARTAMENTOS =
  "https://ctrmetodo.com.br/react/listar.php";

const API_CONDICOES =
  "https://ctrmetodo.com.br/react/condicoes.php";

const Financiamento = () => {
  const navigate = useNavigate();

  const [apartamentos, setApartamentos] = useState([]);
  const [apartamentoCod, setApartamentoCod] = useState("");
  const [apartamentoSelecionado, setApartamentoSelecionado] =
    useState(null);

  const [valorImovel, setValorImovel] = useState("");
  const [entrada, setEntrada] = useState("");
  const [valorFinanciado, setValorFinanciado] = useState("");
  const [quantidadeParcelas, setQuantidadeParcelas] =
    useState("");
  const [valorParcela, setValorParcela] = useState("");
  const [dataPrimeiraParcela, setDataPrimeiraParcela] =
    useState("");
  const [dataEntregaChaves, setDataEntregaChaves] =
    useState("");
  const [dataAssinatura, setDataAssinatura] =
    useState("");
  const [intermediarias, setIntermediarias] =
    useState("");
  const [quantidadeIntermediarias, setQuantidadeIntermediarias] =
    useState("");
  const [formaPagamento, setFormaPagamento] =
    useState("");
  const [financiamento, setFinanciamento] =
    useState("");
  const [observacoes, setObservacoes] = useState("");
  const [respostaPHP, setRespostaPHP] = useState("");

  useEffect(() => {
    const carregarApartamentos = async () => {
      try {
        const resposta = await fetch(
          API_APARTAMENTOS
        );

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
        console.error(erro);

        setRespostaPHP(
          "Não foi possível carregar os apartamentos."
        );
      }
    };

    carregarApartamentos();
  }, []);

  const formatarMoeda = (valor) => {
    const numero = Number(valor);

    if (isNaN(numero)) {
      return "";
    }

    return numero.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleValorImovel = (event) => {
    const texto =
      event.target.value.replace(/\D/g, "");

    if (!texto) {
      setValorImovel("");
      return;
    }

    const numero = Number(texto) / 100;

    setValorImovel(
      formatarMoeda(numero)
    );
  };

  const handleApartamento = (event) => {
    const codigo = event.target.value;

    setApartamentoCod(codigo);

    const selecionado =
      apartamentos.find(
        (item) =>
          String(item.cod) ===
          String(codigo)
      );

    console.log(
      "CODIGO SELECIONADO:",
      codigo
    );

    console.log(
      "APARTAMENTO SELECIONADO:",
      selecionado
    );

    setApartamentoSelecionado(
      selecionado || null
    );

    if (selecionado) {
      const valor =
        selecionado.preco ||
        selecionado.valor ||
        selecionado.valor_imovel ||
        "";

      setValorImovel(
        formatarMoeda(valor)
      );
    } else {
      setValorImovel("");
    }
  };

  const converterMoedaParaBanco = (valor) => {
    if (!valor) {
      return "";
    }

    return String(valor)
      .replace(/\./g, "")
      .replace(",", ".");
  };

  const irParaAreaNegocios = () => {
    if (!apartamentoSelecionado) {
      alert(
        "Selecione um apartamento primeiro."
      );
      return;
    }

    navigate(
      "/area-negocios",
      {
        state: {
          apartamento:
            apartamentoSelecionado,

          valorImovel:
            valorImovel,

          entrada:
            entrada,

          valorFinanciado:
            valorFinanciado,

          quantidadeParcelas:
            quantidadeParcelas,
        },
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!apartamentoSelecionado) {
      setRespostaPHP(
        "Selecione um apartamento antes de salvar."
      );
      return;
    }

    const codigoApartamento =
      apartamentoSelecionado.cod;

    if (
      codigoApartamento === undefined ||
      codigoApartamento === null ||
      codigoApartamento === ""
    ) {
      setRespostaPHP(
        "O apartamento selecionado não possui código."
      );
      return;
    }

    const formulario = new FormData();

    formulario.append(
      "apartamento_cod",
      String(codigoApartamento)
    );

    formulario.append(
      "valor_imovel",
      converterMoedaParaBanco(
        valorImovel
      )
    );

    formulario.append(
      "entrada",
      entrada
    );

    formulario.append(
      "valor_financiado",
      valorFinanciado
    );

    formulario.append(
      "quantidade_parcelas",
      quantidadeParcelas
    );

    formulario.append(
      "valor_parcela",
      valorParcela
    );

    formulario.append(
      "data_primeira_parcela",
      dataPrimeiraParcela
    );

    formulario.append(
      "data_entrega_chaves",
      dataEntregaChaves
    );

    formulario.append(
      "data_assinatura",
      dataAssinatura
    );

    formulario.append(
      "intermediarias",
      intermediarias
    );

    formulario.append(
      "quantidade_intermediarias",
      quantidadeIntermediarias
    );

    formulario.append(
      "forma_pagamento",
      formaPagamento
    );

    formulario.append(
      "financiamento",
      financiamento
    );

    formulario.append(
      "observacoes",
      observacoes
    );

    console.log(
      "DADOS ENVIADOS PARA O PHP:"
    );

    console.log(
      "apartamento_cod:",
      codigoApartamento
    );

    console.log(
      "apartamento:",
      apartamentoSelecionado
    );

    setRespostaPHP(
      "ENVIANDO..."
    );

    try {
      const resposta = await fetch(
        API_CONDICOES,
        {
          method: "POST",
          body: formulario,
        }
      );

      const texto =
        await resposta.text();

      console.log(
        "HTTP:",
        resposta.status
      );

      console.log(
        "RESPOSTA PHP:",
        texto
      );

      setRespostaPHP(
        `HTTP: ${resposta.status}\n\n${texto}`
      );
    } catch (erro) {
      console.error(
        "ERRO FETCH:",
        erro
      );

      setRespostaPHP(
        `ERRO FETCH:\n\n${erro.name}\n\n${erro.message}`
      );
    }
  };

  return (
    <div className="pagina-financiamento">

      <header className="header-financiamento">

        <div className="marca-financiamento">

          <div className="marca-simbolo-financiamento">
            ◆
          </div>

          <div className="marca-texto-financiamento">

            <h1>
              IMÓVEIS
            </h1>

            <span>
              Area DE NEGÓCIO
            </span>

          </div>

        </div>

      </header>

      <main className="area-financiamento">

        <h2 className="titulo-financiamento">
          Condições de Negócio
        </h2>

        <p className="subtitulo-financiamento">
          Informe as condições comerciais do imóvel.
        </p>

        <form
          className="formulario-financiamento"
          onSubmit={handleSubmit}
        >

          <div className="campo-financiamento">

            <label>
              APARTAMENTO
            </label>

            <select
              value={apartamentoCod}
              onChange={
                handleApartamento
              }
            >

              <option value="">
                Selecione
              </option>

              {apartamentos.map(
                (item) => (

                  <option
                    key={item.cod}
                    value={item.cod}
                  >

                    {item.empreendimento}

                    {item.bairro
                      ? ` - ${item.bairro}`
                      : ""}

                  </option>

                )
              )}

            </select>

          </div>

          <div className="campo-financiamento">

            <label>
              VALOR DO IMÓVEL
            </label>

            <input
              type="text"
              value={valorImovel}
              onChange={
                handleValorImovel
              }
              placeholder="0,00"
            />

          </div>

          <div className="campo-financiamento">

            <label>
              ENTRADA
            </label>

            <input
              type="text"
              value={entrada}
              onChange={(event) =>
                setEntrada(
                  event.target.value
                )
              }
            />

          </div>

          <div className="campo-financiamento">
  <label>FINANCIAMENTO</label>
  <input
    type="text"
    value={financiamento}
    onChange={(event) =>
      setFinanciamento(event.target.value)
    }
  />
</div>

          <div className="campo-financiamento">

            <label>
              QUANTIDADE DE PARCELAS
            </label>

            <input
              type="number"
              value={
                quantidadeParcelas
              }
              onChange={(event) =>
                setQuantidadeParcelas(
                  event.target.value
                )
              }
            />

          </div>

          <div className="campo-financiamento">

            <label>
              VALOR DA PARCELA
            </label>

            <input
              type="text"
              value={valorParcela}
              onChange={(event) =>
                setValorParcela(
                  event.target.value
                )
              }
            />

          </div>

          <div className="campo-financiamento">

            <label>
              DATA DA 1ª PARCELA
            </label>

            <input
              type="date"
              value={
                dataPrimeiraParcela
              }
              onChange={(event) =>
                setDataPrimeiraParcela(
                  event.target.value
                )
              }
            />

          </div>

          <div className="campo-financiamento">

            <label>
              ENTREGA DAS CHAVES
            </label>

            <input
              type="date"
              value={
                dataEntregaChaves
              }
              onChange={(event) =>
                setDataEntregaChaves(
                  event.target.value
                )
              }
            />

          </div>

          <div className="campo-financiamento">

            <label>
              DATA DA ASSINATURA
            </label>

            <input
              type="date"
              value={
                dataAssinatura
              }
              onChange={(event) =>
                setDataAssinatura(
                  event.target.value
                )
              }
            />

          </div>

          <div className="campo-financiamento">

            <label>
              INTERMEDIÁRIAS
            </label>

            <input
              type="text"
              value={intermediarias}
              onChange={(event) =>
                setIntermediarias(
                  event.target.value
                )
              }
            />

          </div>

          <div className="campo-financiamento">

            <label>
              QTD. INTERMEDIÁRIAS
            </label>

            <input
              type="number"
              value={
                quantidadeIntermediarias
              }
              onChange={(event) =>
                setQuantidadeIntermediarias(
                  event.target.value
                )
              }
            />

          </div>

          <div className="campo-financiamento">

            <label>
              FORMA DE PAGAMENTO
            </label>

            <select
              value={formaPagamento}
              onChange={(event) =>
                setFormaPagamento(
                  event.target.value
                )
              }
            >

              <option value="">
                Selecione
              </option>

              <option value="À vista">
                À vista
              </option>

              <option value="Financiamento bancário">
                Financiamento bancário
              </option>

              <option value="Entrada + financiamento">
                Entrada + financiamento
              </option>

              <option value="Entrada + parcelas">
                Entrada + parcelas
              </option>

              <option value="Outro">
                Outro
              </option>

            </select>

          </div>

          <div className="campo-financiamento">

            <label>
              FINANCIAMENTO
            </label>

            <select
              value={financiamento}
              onChange={(event) =>
                setFinanciamento(
                  event.target.value
                )
              }
            >

              <option value="">
                Selecione
              </option>

              <option value="Sim">
                Sim
              </option>

              <option value="Não">
                Não
              </option>

              <option value="Em análise">
                Em análise
              </option>

            </select>

          </div>

          <div className="campo-financiamento">

            <label>
              OBSERVAÇÕES
            </label>

            <textarea
              value={observacoes}
              onChange={(event) =>
                setObservacoes(
                  event.target.value
                )
              }
            />

          </div>

          <div className="acoes-financiamento">

            <Link
              to="/"
              className="voltar-financiamento"
            >
              ← VOLTAR
            </Link>

            <button
              type="button"
              onClick={
                irParaAreaNegocios
              }
              className="link-area-negocios"
            >
              ◆ ÁREA DE NEGÓCIOS
            </button>

            <button
              type="submit"
              className="bt-financiamento"
            >
              SALVAR CONDIÇÕES
            </button>

          </div>

          <pre className="resposta-financiamento">
            {respostaPHP}
          </pre>

        </form>

      </main>

    </div>
  );
};

export default Financiamento;