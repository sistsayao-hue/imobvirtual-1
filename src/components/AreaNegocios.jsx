import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AreaNegocios.css";

const AreaNegocios = () => {
  const location = useLocation();
  const dados = location.state || {};
  console.log("DADOS RECEBIDOS:", dados);
console.log("ENTRADA RECEBIDA:", dados.entrada);
  const apartamento = dados.apartamento || {};

  const [compradores, setCompradores] = useState("");
  const [valorPorComprador, setValorPorComprador] = useState("");
  const [entradaPorComprador, setEntradaPorComprador] = useState("");

  const nomeImovel =
    apartamento.empreendimento ||
    apartamento.nome ||
    apartamento.imovel ||
    "";

  const valorImovel = dados.valorImovel || "";
  const entrada = dados.entrada || "";
  const valorFinanciado = dados.valorFinanciado || "";
  const quantidadeParcelas = dados.quantidadeParcelas || "";

  const converterNumero = (valor) => {
    if (valor === undefined || valor === null || valor === "") {
      return 0;
    }

    if (typeof valor === "number") {
      return valor;
    }

    let texto = String(valor)
      .replace("R$", "")
      .replace(/\s/g, "")
      .trim();

    if (texto.includes(",")) {
      texto = texto.replace(/\./g, "").replace(",", ".");
    }

    const numero = Number(texto);

    return isNaN(numero) ? 0 : numero;
  };

  const formatarMoeda = (valor) => {
    const numero = converterNumero(valor);

    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calcularValores = (event) => {
    const quantidade = event.target.value.replace(/\D/g, "");

    setCompradores(quantidade);

    const numeroCompradores = Number(quantidade);
    const numeroImovel = converterNumero(valorImovel);
    const numeroEntrada = converterNumero(entrada);

    if (numeroCompradores > 0) {
      setValorPorComprador(
        numeroImovel / numeroCompradores
      );

      setEntradaPorComprador(
        numeroEntrada / numeroCompradores
      );
    } else {
      setValorPorComprador("");
      setEntradaPorComprador("");
    }
  };

  return (
    <div className="pagina-area-negocios">

      <header className="header-area-negocios">
        <div className="marca-area-negocios">
          <div className="simbolo-area-negocios">
            $
          </div>

          <div>
            <h1>IMÓVEIS</h1>
            <span>ÁREA DE NEGÓCIOS</span>
          </div>
        </div>
      </header>

      <main className="conteudo-area-negocios">

        <div className="titulo-area-negocios">
          <h2>Condições de Negócio</h2>
          <p>
            Visualize os valores e faça a divisão entre os compradores.
          </p>
        </div>

        <section className="oferta-negocio">

          <div className="oferta-topo">
            <span>INFORMAÇÕES DO IMÓVEL</span>
            <strong>NEGOCIAÇÃO</strong>
          </div>

          <div className="linha-negocio">

            <div className="campo-negocio">
              <label>IMÓVEL</label>

              <input
                type="text"
                value={nomeImovel}
                readOnly
              />
            </div>

            <div className="campo-negocio">
              <label>VALOR DO IMÓVEL</label>

              <input
                type="text"
                value={formatarMoeda(valorImovel)}
                readOnly
              />
            </div>

          </div>

          <div className="linha-negocio">

            <div className="campo-negocio">
              <label>ENTRADA</label>

              <input
                type="text"
                value={formatarMoeda(entrada)}
                readOnly
              />
            </div>

            <div className="campo-negocio">
              <label>VALOR FINANCIADO</label>

              <input
                type="text"
                value={formatarMoeda(valorFinanciado)}
                readOnly
              />
            </div>

          </div>

          <div className="linha-negocio">

            <div className="campo-negocio">
              <label>QUANTIDADE DE PARCELAS</label>

              <input
                type="text"
                value={quantidadeParcelas}
                readOnly
              />
            </div>

            <div className="campo-negocio">
              <label>COMPRADOR(ES)</label>

              <input
                type="text"
                inputMode="numeric"
                value={compradores}
                onChange={calcularValores}
                placeholder="Digite a quantidade"
              />
            </div>

          </div>

        </section>

        <section className="resumo-investimento">

          <div className="resumo-titulo">
            <span>DIVISÃO DO NEGÓCIO</span>

            <h3>
              Valores por comprador
            </h3>
          </div>

          <div className="cards-investimento">

            <div className="card-investimento destaque">
              <span>VALOR DO IMÓVEL</span>

              <strong>
                {formatarMoeda(valorImovel)}
              </strong>

              <small>
                Valor total do imóvel
              </small>
            </div>

            <div className="card-investimento">
              <span>ENTRADA</span>

              <strong>
                {formatarMoeda(entrada)}
              </strong>

              <small>
                Valor total da entrada
              </small>
            </div>

            <div className="card-investimento">
              <span>VALOR / COMPRADOR</span>

              <strong>
                {valorPorComprador === ""
                  ? "R$ 0,00"
                  : formatarMoeda(valorPorComprador)}
              </strong>

              <small>
                Divisão do valor do imóvel
              </small>
            </div>

            <div className="card-investimento">
              <span>ENTRADA / COMPRADOR</span>

              <strong>
                {entradaPorComprador === ""
                  ? "R$ 0,00"
                  : formatarMoeda(entradaPorComprador)}
              </strong>

              <small>
                Divisão da entrada
              </small>
            </div>

          </div>

          <div className="projecao-financeira">

            <div className="projecao-item">
              <span>COMPRADORES</span>

              <strong>
                {compradores || "0"}
              </strong>
            </div>

            <div className="projecao-item">
              <span>VALOR FINANCIADO</span>

              <strong>
                {formatarMoeda(valorFinanciado)}
              </strong>
            </div>

            <div className="projecao-item resultado">
              <span>ENTRADA POR COMPRADOR</span>

              <strong>
                {entradaPorComprador === ""
                  ? "R$ 0,00"
                  : formatarMoeda(entradaPorComprador)}
              </strong>
            </div>

          </div>

        </section>

        <section className="vantagens-negocio">

          <h3>
            Resumo da negociação
          </h3>

          <div className="vantagens-grid">

            <div className="vantagem">
              <div>🏠</div>

              <h4>Imóvel</h4>

              <p>
                {nomeImovel || "Imóvel selecionado"}
              </p>
            </div>

            <div className="vantagem">
              <div>💰</div>

              <h4>Valor total</h4>

              <p>
                {formatarMoeda(valorImovel)}
              </p>
            </div>

            <div className="vantagem">
              <div>🤝</div>

              <h4>Compradores</h4>

              <p>
                {compradores || "Nenhum comprador informado"}
              </p>
            </div>

            <div className="vantagem">
              <div>📊</div>

              <h4>Valor individual</h4>

              <p>
                {valorPorComprador === ""
                  ? "Informe os compradores"
                  : formatarMoeda(valorPorComprador)}
              </p>
            </div>

          </div>

        </section>

        <div className="acoes-area-negocios">

          <Link
            to="/financiamento"
            className="voltar-negocios"
          >
            ← VOLTAR
          </Link>

          <Link
            to="/"
            className="inicio-negocios"
          >
            INÍCIO
          </Link>

        </div>

      </main>

    </div>
  );
};

export default AreaNegocios;