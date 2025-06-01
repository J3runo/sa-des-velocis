'use client'

import { useEffect, useState } from "react";
import "./style.css";
import Cabecalho from "@/components/Cabecalho/pages";
import { API } from "@/services/api";


type veiculo = {
  modelo: string;
  cor: string;
  pneuId: string;
  cambioId: string;
  motorId: string;
};

type EstoqueItem = {
  id: string;
  descricao: string; 
  marca: string;    
};

export default function Producao() {
  const [nomeVeiculo, setNomeVeiculo] = useState("");
  const [corVeiculo, setCorProducaoVeiculo] = useState("");
  const [pneuVeiculo, setPneuVeiculo] = useState("");
  const [cambioVeiculo, setCambioVeiculo] = useState("");
  const [motorVeiculo, setMotorVeiculo] = useState("");

  const [productionFromApi, setVeiculo] = useState<veiculo[]>([]);
  const [estoques, setEstoques] = useState<EstoqueItem[]>([]);

  const filtrarPorDescricao = (descricao: string) =>
    estoques.filter((item) => item.descricao === descricao);
  
  const buscarNomePorId = (id: string) =>
    estoques.find((item) => item.id === id)?.marca || "";


  async function getProducao() {
    try {
      const response = await API.get("/veiculos");
      const data = response.data;
  
      const veiculosMapeados = data.map((item: any) => {
        const estoqueMap: any = {}; 
  
        item.Veiculo_Estoque.forEach((v: any) => {
          const tipo = v.estoque.descricao;
          if (tipo) {
            estoqueMap[tipo] = v.estoqueId;
          }
        });
  
        return {
          modelo: item.modelo,
          cor: item.cor,
          pneuId: estoqueMap["pneu"] || "",
          cambioId: estoqueMap["cambio"] || "",
          motorId: estoqueMap["motor"] || "",
        };
      });
  
      setVeiculo(veiculosMapeados);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    }
  }
  
  
  console.log()
  async function getEstoque() {
    try {
      const response = await API.get('/estoques');
      setEstoques(response.data);
    } catch (error) {
      console.error("Erro ao buscar estoques:", error);
    }
  }

  useEffect(() => {
    getProducao();
    getEstoque();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newVehicle: veiculo = {
      modelo: nomeVeiculo,
      cor: corVeiculo,
      pneuId: pneuVeiculo,
      cambioId: cambioVeiculo,
      motorId: motorVeiculo,
    };

    try {
      await API.post('/veiculos', newVehicle);
      await getProducao();
    } catch (error) {
      console.error("Erro ao registrar veículo:", error);
    }

    setNomeVeiculo("");
    setCorProducaoVeiculo("");
    setPneuVeiculo("");
    setCambioVeiculo("");
    setMotorVeiculo("");
  };

  return (
    <div>
      <Cabecalho name="Produção" />
      <div className="producao">
        <main>
          <section>
            <h2 className="h2">Registrar Novo Veículo</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-container">
                <div className="form-group">
                  <label htmlFor="name">Nome do Veículo</label>
                  <input
                    type="text"
                    id="name"
                    value={nomeVeiculo}
                    onChange={(e) => setNomeVeiculo(e.target.value)}
                  />
                </div>

                <div className="group-form">
                  <label htmlFor="cor">Cor do Veículo</label>
                  <select
                    id="cor"
                    name="cor"
                    value={corVeiculo}
                    onChange={(e) => setCorProducaoVeiculo(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="branco">Branco</option>
                    <option value="preto">Preto</option>
                    <option value="vermelho">Vermelho</option>
                    <option value="azul">Azul</option>
                    <option value="prata">Prata</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="pneus">Pneus</label>
                  <select
                    id="pneus"
                    name="pneu"
                    value={pneuVeiculo}
                    onChange={(e) => setPneuVeiculo(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    {filtrarPorDescricao("pneu").map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.marca}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="cambio">Câmbio</label>
                  <select
                    id="cambio"
                    name="cambio"
                    value={cambioVeiculo}
                    onChange={(e) => setCambioVeiculo(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    {filtrarPorDescricao("cambio").map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.marca}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="motor">Motor</label>
                  <select
                    id="motor"
                    name="motor"
                    value={motorVeiculo}
                    onChange={(e) => setMotorVeiculo(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    {filtrarPorDescricao("motor").map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.marca}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit">Enviar para Produção</button>
            </form>
          </section>

          <section className="vehicle-list">
            <h2 className="h2">Veículos Produzidos</h2>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Cor</th>
                  <th>Pneu</th>
                  <th>Câmbio</th>
                  <th>Motor</th>
                </tr>
              </thead>
              <tbody>
                {productionFromApi.map((veiculo, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{veiculo.modelo}</td>
                    <td>{veiculo.cor}</td>
                    <td>{buscarNomePorId(veiculo.pneuId)}</td>
                    <td>{buscarNomePorId(veiculo.cambioId)}</td>
                    <td>{buscarNomePorId(veiculo.motorId)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}
