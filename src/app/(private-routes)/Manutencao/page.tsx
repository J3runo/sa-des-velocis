"use client";

import Cabecalho from "@/components/Cabecalho/pages";
import { useEffect, useState } from "react";
import "./Style.css";
import { API } from "@/services/api";

interface Manutencao {
  id: string;
  description: string;
  cor: string;
  createdAt: string;
  updatedAt: string;
  ativo: boolean;
}

export default function manutencao() {
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
      console.log(error);
    }
  }

  return (
    <div>
      <Cabecalho name="Manutenção" />

      <div className="container-manutencao">
        <h1>Veículos Cadastrados</h1>

        {manutencao.length === 0 ? (
          <p>Nenhum veículo encontrado.</p>
        ) : (
          <table className="tabela-veiculos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Cor</th>
                <th>Criado em</th>
                <th>Atualizado em</th>
                <th>Ativo</th>
              </tr>
            </thead>
            <tbody>
              {manutencao.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.description}</td>
                  <td>{item.cor}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                  <td>{new Date(item.updatedAt).toLocaleString()}</td>
                  <td>{item.ativo ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
