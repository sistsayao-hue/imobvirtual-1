
import "./card.css";

const Card = (produto) => {

  const urlVideo = produto.video
    ? `https://ctrmetodo.com.br/Fotografias/${produto.video}`
    : "";

  return (
    <div>
      <div className="cartao">

        <h2 className="bairro">
          Bairro: {produto.localizacao}
        </h2>

        <h2 className="empre">
          {produto.empreendimento}
        </h2>

        <div className="area-video">

          {produto.video && (
            <video
              className="take"
              controls
              preload="metadata"
            >
              <source
                src={urlVideo}
                type="video/mp4"
              />

              Seu navegador não suporta vídeo.
            </video>
          )}

        </div>

        <h3 className="valor">
          Valor: {produto.preco}
        </h3>

      </div>
    </div>
  );
};

export default Card;
