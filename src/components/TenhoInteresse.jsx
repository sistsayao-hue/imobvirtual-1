import { useState } from "react";
import "./TenhoInteresse.css";

const API_INTERESSE =
  "https://ctrmetodo.com.br/react/interessados.php";

const TenhoInteresse = ({ imovel, onFechar }) => {

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setErro("");

    // Validação
    if (!nome.trim() || !telefone.trim()) {
      setErro("Preencha seu nome e telefone.");
      return;
    }

    // Verifica se existe o código do imóvel
    if (!imovel?.cod) {
      setErro("Não foi possível identificar o imóvel.");
      return;
    }

    setEnviando(true);

    try {

      const resposta = await fetch(API_INTERESSE, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          apartamento_cod: Number(imovel.cod),
          nome: nome.trim(),
          telefone: telefone.trim(),
          email: email.trim(),
        }),
      });

      const dados = await resposta.json();

      console.log("RESPOSTA INTERESSE:", dados);

      if (!resposta.ok || !dados.sucesso) {

        throw new Error(
          dados.mensagem || "Não foi possível enviar seu interesse."
        );
      }

      // Sucesso
      setEnviado(true);

    } catch (error) {

      console.error("ERRO AO ENVIAR INTERESSE:", error);

      setErro(
        error.message ||
        "Não foi possível enviar seus dados. Tente novamente."
      );

    } finally {

      setEnviando(false);

    }
  };

  return (
    <div className="modal-interesse">

      <div className="interesse-box">

        {/* BOTÃO FECHAR */}

        <button
          className="fechar-interesse"
          onClick={onFechar}
          type="button"
          aria-label="Fechar"
        >
          ×
        </button>

        {!enviado ? (

          <>
            {/* CABEÇALHO */}

            <div className="interesse-cabecalho">

              <span className="interesse-icone">
                ♡
              </span>

              <h2>
                Tenho Interesse
              </h2>

              <p>
                Preencha seus dados e entraremos em contato
                para apresentar este imóvel.
              </p>

            </div>


            {/* IMÓVEL */}

            <div className="imovel-interesse">

              <strong>
                {imovel?.empreendimento ||
                  "Imóvel selecionado"}
              </strong>

              <span>
                {imovel?.bairro ||
                  imovel?.localizacao ||
                  "São Paulo"}
              </span>

              {imovel?.m2 && (
                <span>
                  {imovel.m2} m²
                </span>
              )}

            </div>


            {/* FORMULÁRIO */}

            <form onSubmit={handleSubmit}>

              {/* NOME */}

              <div className="campo-interesse">

                <label htmlFor="nome">
                  Nome
                </label>

                <input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) =>
                    setNome(e.target.value)
                  }
                  disabled={enviando}
                />

              </div>


              {/* TELEFONE */}

              <div className="campo-interesse">

                <label htmlFor="telefone">
                  WhatsApp / Telefone
                </label>

                <input
                  id="telefone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={telefone}
                  onChange={(e) =>
                    setTelefone(e.target.value)
                  }
                  disabled={enviando}
                />

              </div>


              {/* EMAIL */}

              <div className="campo-interesse">

                <label htmlFor="email">
                  E-mail
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="seuemail@email.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  disabled={enviando}
                />

              </div>


              {/* ERRO */}

              {erro && (
                <div className="erro-interesse">
                  {erro}
                </div>
              )}


              {/* BOTÃO */}

              <button
                type="submit"
                className="btn-enviar-interesse"
                disabled={enviando}
              >

                {enviando
                  ? "ENVIANDO..."
                  : "ENVIAR MEU INTERESSE"}

              </button>

            </form>

          </>

        ) : (

          /* =========================
             SUCESSO
          ========================== */

          <div className="interesse-sucesso">

            <div className="sucesso-icone">
              ✓
            </div>

            <h2>
              Interesse enviado!
            </h2>

            <p>
              Recebemos seus dados com sucesso.
            </p>

            <p>
              Em breve um consultor entrará em contato
              para apresentar este imóvel.
            </p>

            <button
              className="btn-fechar-sucesso"
              onClick={onFechar}
              type="button"
            >
              FECHAR
            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default TenhoInteresse;