"use client";

import Cabecalho from "@/components/Cabecalho/pages";
import { useEffect, useState } from "react";
import "./Style.css";
import { API } from "@/services/api";

// Interface dos componentes de estoque vinculados ao veículo
interface Componente {
  id: string;
  descricao: string;
  marca: string;
  quantidade: number;
  createdAt: string;
  updatedAt: string;
}

// Interface do veículo
interface Manutencao {
  id: string;
  modelo: string;
  cor: string;
  createdAt: string;
  updatedAt: string;
  aprovado: boolean;
  motor: Componente;
  pneu: Componente;
  cambio: Componente;
}

export default function ManutencaoPage() {
  const [manutencao, setManutencao] = useState<Manutencao[]>([]);

  useEffect(() => {
    loadManutencao();
  }, []);

  async function loadManutencao() {
    try {
      const response = await API.get<Manutencao[]>("/allVeiculo");
      console.log("Dados recebidos da API:", response.data);
      setManutencao(response.data);
    } catch (error) {
      console.log("Erro ao carregar veículos:", error);
    }
  }

  return (
    <div>
      <Cabecalho name="Manutenção" />

      <div className="container-manutencao">
        <h2>Veículos para revisão</h2>

        <div className="veiculo-manutencao">
          {manutencao.map((item) => (
            <div key={item.id} className="item-veiculo">
              <p><strong>ID:</strong> {item.id}</p>
              <p><strong>Modelo:</strong> {item.modelo}</p>
              <p><strong>Cor:</strong> {item.cor}</p>
              <p><strong>Fabricado:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>

              <p><strong>Motorização:</strong> {item.motor?.marca}</p>
              <p><strong>Câmbio:</strong> {item.cambio?.marca}</p>
              <p><strong>Pneu:</strong> {item.pneu?.marca}</p>
              <p>{item.aprovado ? "✅" : "❌"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
