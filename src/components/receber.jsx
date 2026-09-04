import { useState } from "react";

import "./receber.css";

const Receber = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [respostaPHP, setRespostaPHP] = useState("");

  const adicionar = async () => {
    const dados = {
      nome: nome,
      telefone: telefone,
    };

    // Mostra o JSON que será enviado
    setRespostaPHP(
      "JSON ENVIADO:\n\n" +
      JSON.stringify(dados, null, 2)
    );

    try {
      const resposta = await fetch(
        "https://ctrmetodo.com.br/react/receber.php",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(dados),
        }
      );

      const texto = await resposta.text();

      // Mostra o que o PHP respondeu
      setRespostaPHP(
        "HTTP: " +
        resposta.status +
        "\n\n" +
        "RESPOSTA DO PHP---------:\n\n" +
        texto
      );

    } catch (erro) {

      setRespostaPHP(
        "ERRO FETCH:\n\n" +
        erro.message
      );
    }
  };

  return (
    <div className="pagina-receber">

      <h3>Relações Contatos</h3>

      <div className="receber">

        <input
          type="text"
          placeholder="Digite o nome do contato"
          value={nome}
          onChange={(event) =>
            setNome(event.target.value)
          }
        />

        <input
          type="text"
          placeholder="Digite o telefone do contato"
          value={telefone}
          onChange={(event) =>
            setTelefone(event.target.value)
          }
        />

        <button onClick={adicionar}>
          Adicionar
        </button>

        <pre className="resposta">
          {respostaPHP}
        </pre>

      </div>

    </div>
  );
};

export default Receber;