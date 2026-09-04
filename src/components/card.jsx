
import "./card.css";

const Card = (produto) => {
  return (
    <div>
      <div className = "cartao">
      <h2 className="bairro">Bairro:{produto.localizacao}</h2>
<h2 className="empre" >{produto.empreendimento}</h2>

      







  <div className="area-video">
      {produto.video && (
        <video className="take"  controls>
          <source src={produto.video} type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>

        
      )}
</div>

      <h3 className="valor" >valor:{produto.preco}</h3>

      </div>
    </div>
  );
};

export default Card;