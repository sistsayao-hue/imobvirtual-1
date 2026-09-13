
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginCorretor.css";

const LoginCorretor = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const entrar = async (e) => {
    e.preventDefault();

    setErro("");

    if (!usuario.trim() || !senha.trim()) {
      setErro("Informe o usuário e a senha.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(
        "https://ctrmetodo.com.br/SEU_LOGIN.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          credentials: "include",
          body: new URLSearchParams({
            usuario: usuario.trim(),
            senha: senha,
          }),
        }
      );

      const texto = await resposta.text();

      console.log("Resposta do servidor:", texto);

      if (!resposta.ok) {
        throw new Error("Erro ao acessar o servidor.");
      }

      /*
        TEMPORÁRIO:

        Aqui vamos colocar a verificação real
        quando definirmos o PHP correto.

        Por enquanto não libera o cadastro automaticamente.
      */

      if (texto.includes("OK")) {
        sessionStorage.setItem("corretorLogado", "true");
        navigate("/cadastro");
      } else {
        setErro("Usuário ou senha inválidos.");
      }

    } catch (error) {
      console.error("Erro no login:", error);
      setErro("Não foi possível realizar o login.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="login-corretor">
      <div className="login-card">

        <div className="login-logo">
          <span>IV</span>
        </div>

        <div className="login-cabecalho">
          <span>ÁREA RESTRITA</span>
          <h1>Acesso do corretor</h1>
          <p>
            Entre com seu usuário e senha para cadastrar imóveis.
          </p>
        </div>

        <form onSubmit={entrar}>

          <div className="campo-login">
            <label htmlFor="usuario">
              Usuário
            </label>

            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
              autoComplete="username"
              disabled={carregando}
            />
          </div>

          <div className="campo-login">
            <label htmlFor="senha">
              Senha
            </label>

            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              disabled={carregando}
            />
          </div>

          {erro && (
            <div className="erro-login">
              {erro}
            </div>
          )}

          <button
            type="submit"
            className="botao-entrar"
            disabled={carregando}
          >
            {carregando ? "Verificando..." : "Entrar"}
          </button>

        </form>

        <button
          type="button"
          className="botao-voltar"
          onClick={() => navigate("/")}
        >
          ← Voltar para os imóveis
        </button>

      </div>
    </main>
  );
};

export default LoginCorretor;
