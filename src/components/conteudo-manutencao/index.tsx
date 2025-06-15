import { API } from "@/services/api";

export default async function conteudoManutencao() {
  try {
    const reprovados = await API.get("/allVeiculo", {
      params: {
        aprovado: false,
      },
    });
    console.log("- - - - - - - - - - -");
    console.log(reprovados.data);
    console.log("- - - - - - - - - - -");
  } catch (error) {
    alert("Nao Encontrado veiculos para manutencao.");
  }

  return (
    <div className="content">
      <h1>Conteudo</h1>
    </div>
  );
}
