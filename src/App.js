import { useState, useEffect } from "react";

export default function App() {
  // Estado para armazenar a lista de compras
  const [listaCompras, setListaCompras] = useState([]);

  // Estado para armazenar o valor do item sendo digitado
  const [item, setItem] = useState("");

  // Função para adicionar um item à lista de compras
  const adicionarItem = () => {
    if (item.trim() !== "") {
      // Verifica se o item não está vazio ou contém apenas espaços em branco
      setListaCompras([...listaCompras, item]); // Adiciona o item à lista de compras
      setItem(""); // Limpa o campo de entrada
    }
  };
  //Função para adicionar no Local Storage
  // const adicionarLocalStorage = () => {
  //   const stringCompras = JSON.stringify(listaCompras);
  //   localStorage.setItem("compra-Lista", stringCompras);
  // };

  //useEffect colocando a lista de compras na memória

  useEffect(()=>{
    if(listaCompras.length>0){
    const stringCompras = JSON.stringify(listaCompras);
    localStorage.setItem("compra-Lista", stringCompras);
  }
  },[listaCompras])

  // Função para reapresentar a lista na tela
  // const trazerLista = () => {
  //   const listaAntiga = JSON.parse(localStorage.getItem("compra-Lista"));
  //   setListaCompras(listaAntiga);
  // };

  //UseEffect fazendo a lista renderizar na tela mesmo depois de recarregar
  useEffect(()=>{
    if(listaCompras){
      const listaAntiga = JSON.parse(localStorage.getItem("compra-Lista"));
      if(listaAntiga){
        setListaCompras(listaAntiga);
      }
    
    }
  },[])

  const removerItem = ()=>{
    localStorage.removeItem("compra-Lista")
    setListaCompras([])
  }
  

  return (
    <div>
      <h1>Lista de Compras</h1>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Digite um item"
      />
      <button onClick={adicionarItem}>Adicionar</button>
      {/* <button onClick={adicionarLocalStorage}>Salvar itens</button> */}
      {/* <button onClick={trazerLista}>Mostrar lista de novo</button> */}
      <button onClick={removerItem}>Remover lista completa</button>

      <ul>
        {listaCompras.map((compra, index) => (
          <li key={index}>{compra}</li>
        ))}
      </ul>
    </div>
  );
}
