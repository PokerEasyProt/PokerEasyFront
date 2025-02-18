import axios from "axios";
import { useState, useEffect } from "react";

function Teste() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/users/cargo/${'player'}`);
        setLista(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {lista.map((user, index) => (
        <div key={index} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p>Nome: {user.name}</p>
          <p>Outro Campo: {user.cargo}</p>
        </div>
      ))}
    </div>
  );
}

export default Teste;