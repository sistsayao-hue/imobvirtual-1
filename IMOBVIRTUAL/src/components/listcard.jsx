import Card from "./card";

const ListCard = ({ produtos = [] }) => {
  return (
    <div className="lista-cartoes">
      {produtos.map((produto, index) => (
        <Card
          key={
            produto.cod ??
            produto.id ??
            index
          }
          produto={produto}
        />
      ))}
    </div>
  );
};

export default ListCard;