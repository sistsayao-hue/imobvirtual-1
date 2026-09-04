import { useEffect, useState } from "react";

const Teste = () => {
  const agora = new Date();

  const [horas, setHoras] = useState(agora.getHours());
  const [minutos, setMinutos] = useState(agora.getMinutes());
  const [segundos, setSegundos] = useState(agora.getSeconds());

  useEffect(() => {
    const intervalo = setInterval(() => {
      const agora = new Date();

      setHoras(agora.getHours());
      setMinutos(agora.getMinutes());
      setSegundos(agora.getSeconds());
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  return (
    <div>
      <h1>
        {horas < 10 ? `0${horas}` : horas}:
        {minutos < 10 ? `0${minutos}` : minutos}:
        {segundos < 10 ? `0${segundos}` : segundos}
      </h1>
    </div>
  );
};

export default Teste;