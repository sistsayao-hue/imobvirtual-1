import "./card.css";

const Card = ({ produto }) => {
  const arquivo = produto.video || produto.imagem || "";
  const urlArquivo = arquivo
    ? (arquivo.startsWith("http") ? arquivo : `https://ctrmetodo.com.br/Fotografias/${arquivo}`)
    : "";
  const extensao = arquivo.split(".").pop()?.toLowerCase() || "";
  const ehVideo = ["mp4", "webm", "ogg"].includes(extensao);
  const ehImagem = ["png", "jpg", "jpeg", "webp", "gif"].includes(extensao);
  const bairro = produto.bairro || produto.localizacao || "São Paulo";

  return (
    <article className="cartao">
      <div className="cartao-media">
        {ehVideo && <video className="take" controls preload="metadata"><source src={urlArquivo} type={`video/${extensao}`} /></video>}
        {ehImagem && <img className="take" src={urlArquivo} alt={produto.empreendimento || "Imóvel"} />}
        {!arquivo && (
          <div className="sem-arquivo">
            <span className="casa-icone">⌂</span>
            <small>IMÓVEL SELECIONADO</small>
            <strong>{bairro}</strong>
          </div>
        )}
        <span className="tag-imovel">{produto.regiao || "SP"}</span>
      </div>

      <div className="cartao-corpo">
        <p className="localizacao">● {bairro}</p>
        <h2>{produto.empreendimento || "Apartamento"}</h2>
        {produto.descricao && <p className="descricao">{produto.descricao}</p>}
        <div className="detalhes">
          {produto.m2 && <span><b>{produto.m2}</b> m²</span>}
          <span><b>Residencial</b></span>
        </div>
        <div className="cartao-rodape">
          <span>Valor do imóvel</span>
          <strong>{produto.preco || "Consulte"}</strong>
        </div>
      </div>
    </article>
  );
};

export default Card;
