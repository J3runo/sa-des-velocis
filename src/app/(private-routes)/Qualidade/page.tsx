"use client";

import { useState, useEffect } from "react";
import estilos from "./styles.module.css";
import Cabecalho from "@/components/Cabecalho/pages";
import { API } from "@/services/api";

type StatusVeiculo = true | false;

interface Veiculo {
  id: string;
  modelo: string;
  dataProducao: string;
  status: StatusVeiculo;
}

export default function Qualidade() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [abaSelecionada, setAbaSelecionada] = useState<"todos" | "aprovado" | "reprovado">("todos");

  // 🔄 Buscar os veículos da API
  useEffect(() => {
    async function getVeiculos() {
      try {
        const response = await API.get("/veiculos");
        const data = response.data;

        const veiculosTratados: Veiculo[] = data.map((v: any) => ({
          id: v.id,
          modelo: v.modelo,
          dataProducao: new Date(v.createdAt).toISOString().split("T")[0],
          status: v.aprovado,
        }));

        setVeiculos(veiculosTratados);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      }
    }

    getVeiculos();
  }, []);


  const handleStatusChange = async (id: string, novoStatus: StatusVeiculo) => {
    try {
      await API.patch(`/veiculos/${id}/status`, {
        aprovado: novoStatus,
      });


      setVeiculos((prev) =>
        prev.map((v) =>
          v.id === id ? { ...v, status: novoStatus } : v
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar status do veículo:", error);
    }
  };

  const veiculosFiltrados =
    abaSelecionada === "todos"
      ? veiculos
      : veiculos.filter((v) =>
        abaSelecionada === "aprovado" ? v.status === true : v.status === false
      );

  return (
    <div>
      <Cabecalho name="Qualidade" />
      <div className={estilos.container}>
        <div className={estilos.abas}>
          {["todos", "aprovado", "reprovado"].map((tipo) => (
            <div
              key={tipo}
              onClick={() => setAbaSelecionada(tipo as typeof abaSelecionada)}
              className={`${estilos.aba} ${abaSelecionada === tipo && estilos.abaSelecionada}`}
            >
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </div>
          ))}
        </div>

        <div className={estilos.conteudo}>
          {veiculosFiltrados.length === 0 ? (
            <p>Nenhum veículo encontrado.</p>
          ) : (
            <ul className={estilos.listaVeiculos}>
              {veiculosFiltrados.map((veiculo) => (
                <li key={veiculo.id} className={estilos.itemVeiculo}>
                  <strong>{veiculo.modelo}</strong> — {veiculo.dataProducao} —{" "}
                  <label>
                    <input
                      type="checkbox"
                      checked={veiculo.status === true}
                      onChange={(e) => {
                        const novoStatus = e.target.checked;
                        handleStatusChange(veiculo.id, novoStatus);
                      }}
                    />
                    {veiculo.status === true ? "Aprovado" : "Reprovado"}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
