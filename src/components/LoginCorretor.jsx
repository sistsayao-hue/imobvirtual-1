
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./LoginCorretor.css";


// ======================================================
// ENDEREÇO DO PHP
// ======================================================

const API_LOGIN =
  "https://ctrmetodo.com.br/react/loginCorretor.php";


// ======================================================
// COMPONENTE
// ======================================================

const LoginCorretor = () => {

  const navigate = useNavigate();


  // ====================================================
  // ESTADOS
  // ====================================================

  const [usuario, setUsuario] = useState("");

  const [senha, setSenha] = useState("");

  const [mensagem, setMensagem] = useState("");

  const [carregando, setCarregando] = useState(false);


  // ====================================================
  // LOGIN
  // ====================================================

  const entrar = async (e) => {

    e.preventDefault();

    setMensagem("");


    // --------------------------------------------------
    // VALIDAR CAMPOS
    // --------------------------------------------------

    if (!usuario.trim() || !senha.trim()) {

      setMensagem(
        "Informe usuário e senha."
      );

      return;
    }


    setCarregando(true);


    try {


      // ------------------------------------------------
      // MONTAR DADOS
      // ------------------------------------------------

      const dadosFormulario =
        new URLSearchParams();

      dadosFormulario.append(
        "usuario",
        usuario.trim()
      );

      dadosFormulario.append(
        "senha",
        senha
      );


      // ------------------------------------------------
      // ENVIAR PARA PHP
      // ------------------------------------------------

      const resposta = await fetch(
        API_LOGIN,
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded; charset=UTF-8"
          },

          body:
            dadosFormulario.toString()
        }
      );


      // ------------------------------------------------
      // VERIFICAR HTTP
      // ------------------------------------------------

      if (!resposta.ok) {

        throw new Error(
          `Erro HTTP ${resposta.status}`
        );
      }


      // ------------------------------------------------
      // LER JSON
      // ------------------------------------------------

      const dados =
        await resposta.json();


      console.log(
        "RESPOSTA DO LOGIN:",
        dados
      );


      // ------------------------------------------------
      // LOGIN AUTORIZADO
      // ------------------------------------------------

      if (dados.sucesso === true) {


        // ----------------------------------------------
        // SALVAR SESSÃO DO REACT
        // ----------------------------------------------

        sessionStorage.setItem(
          "corretorLogado",
          "true"
        );


        sessionStorage.setItem(
          "corretorNome",
          dados.nome || ""
        );


        sessionStorage.setItem(
          "corretorUsuario",
          dados.usuario || ""
        );


        sessionStorage.setItem(
          "corretorCod",
          dados.cod || ""
        );


        // ----------------------------------------------
        // IR PARA CADASTRO
        // ----------------------------------------------

        navigate("/cadastro");


      } else {


        // ----------------------------------------------
        // LOGIN NEGADO
        // ----------------------------------------------

        setMensagem(
          dados.mensagem ||
          "Usuário ou senha inválidos."
        );

      }


    } catch (error) {


      console.error(
        "ERRO NO LOGIN:",
        error
      );


      setMensagem(
        "Não foi possível conectar ao servidor."
      );


    } finally {

      setCarregando(false);

    }

  };


  // ====================================================
  // VOLTAR
  // ====================================================

  const voltar = () => {

    navigate("/");

  };


  // ====================================================
  // TELA
  // ====================================================

  return (

    <div className="login-corretor">

      <div className="login-corretor-card">


        {/* ============================================
            CABEÇALHO
        ============================================ */}

        <div className="login-corretor-topo">

          <span className="login-corretor-tag">
            ÁREA RESTRITA
          </span>


          <h1>
            Acesso do corretor
          </h1>


          <p>
            Entre com seu usuário e senha
            para acessar o cadastro de imóveis.
          </p>

        </div>


        {/* ============================================
            FORMULÁRIO
        ============================================ */}

        <form onSubmit={entrar}>


          {/* ==========================================
              USUÁRIO
          ========================================== */}

          <div className="campo-login">

            <label htmlFor="usuario">
              Usuário
            </label>


            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) =>
                setUsuario(e.target.value)
              }
              placeholder="Digite seu usuário"
              autoComplete="username"
              disabled={carregando}
            />

          </div>


          {/* ==========================================
              SENHA
          ========================================== */}

          <div className="campo-login">

            <label htmlFor="senha">
              Senha
            </label>


            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
              placeholder="Digite sua senha"
              autoComplete="current-password"
              disabled={carregando}
            />

          </div>


          {/* ==========================================
              MENSAGEM
          ========================================== */}

          {mensagem && (

            <div className="mensagem-login">

              {mensagem}

            </div>

          )}


          {/* ==========================================
              BOTÃO ENTRAR
          ========================================== */}

          <button
            type="submit"
            className="botao-login"
            disabled={carregando}
          >

            {carregando
              ? "Entrando..."
              : "Entrar"
            }

          </button>


        </form>


        {/* ============================================
            VOLTAR
        ============================================ */}

        <button
          type="button"
          className="botao-voltar-login"
          onClick={voltar}
          disabled={carregando}
        >

          ← Voltar para os imóveis

        </button>


      </div>

    </div>

  );
};


export default LoginCorretor;
