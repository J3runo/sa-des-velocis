"use client";
import { BsCalendar2Date, BsPersonCircle } from "react-icons/bs";
import "./style.css";
import { TbLockPassword } from "react-icons/tb";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineEmail,
} from "react-icons/md";
import { useState } from "react";
import { API } from "@/services/api";
import { randomUUID } from "crypto";
import { useRouter } from "next/navigation";
import Link from "next/link";

type User = {
  name: string;
  email: string;
  password: string;
  birthDate: string;
};

export default function Cadastro() {
  const [nome, setNewNome] = useState("");
  const [email, setNewEmail] = useState("");
  const [senha, setNewSenha] = useState("");
  const [dataNascimento, setNewDataNascimento] = useState("");

  const router = useRouter();
  async function createUser() {
    const newUser: User = {
      name: nome,
      email: email,
      password: senha,
      birthDate: dataNascimento,
    };
    console.log(newUser);
    try {
      await API.post("/user/register", newUser);
      alert("Usuário cadastrado com sucesso!");
      router.push("/Login");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert("Erro ao cadastrar. Verifique os dados.");
    }

    setNewNome("");
    setNewEmail("");
    setNewSenha("");
    setNewDataNascimento("");
  }

  return (
    <div className="container-cadastro">
      <div className="icons">
        <BsPersonCircle size={85} />
      </div>
      <div className="inputs">
        <div className="itens-1">
          <div className="icon-name">
            <MdOutlineDriveFileRenameOutline size={25} />
          </div>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNewNome(e.target.value)}
          />
        </div>

        <div className="itens-2">
          <div className="icon-email">
            <MdOutlineEmail size={25} />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>

        <div className="itens-3">
          <div className="icon-date">
            <BsCalendar2Date size={23} />
          </div>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setNewDataNascimento(e.target.value)}
          />
        </div>

        <div className="itens-4">
          <div className="icon-password">
            <TbLockPassword size={25} />
          </div>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setNewSenha(e.target.value)}
          />
        </div>

        <div className="button-login">
          <button onClick={createUser}>Salvar</button>
        </div>
        <Link href="/Login">
          <span>Ja possui cadastro?</span>
        </Link>
      </div>
    </div>
  );
}
