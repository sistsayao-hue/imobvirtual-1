import Card from "./card";

import "./lista.css";


const ListCard = ({ produtos }) => {

return (

<div>
 <div className="lista">
{ produtos.map((produto)=> (

<Card

key={produto.id}
   localizacao={produto.localizacao}
empreendimento={produto.empreendimento}
video={produto.video}


          preco={produto.preco}
            regiao={produto.regiao}
        
  />

))}

</div>
</div>


);




}




export default ListCard;