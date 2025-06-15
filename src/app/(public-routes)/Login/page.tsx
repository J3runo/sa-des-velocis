"use client";

import { useRouter } from "next/navigation";
import "./style.css";
import { BsPersonCircle } from "react-icons/bs";
import { TbLockPassword } from "react-icons/tb";
import { IoPeopleOutline } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import { API } from "@/services/api";

type User = {
  email: string;
  password: string;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleLogin() {
    const newUser: User = { email, password };

    try {
      const response = await API.post("/users/login", newUser);
      console.log("Login realizado:", response.data);
      router.push("/Home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Email ou senha inválidos.");
    }
  }
  return (
    <div className="container-login">
      <div className="icons">
        <BsPersonCircle size={85} />
      </div>
      <div className="inputs">
        <div className="item-name">
          <div className="icon-name">
            <IoPeopleOutline size={25} />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="item-senha">
          <div className="icon-senha">
            <TbLockPassword size={25} />
          </div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-login">
          <button onClick={handleLogin}>Login</button>
        </div>
        <Link href="/Cadastro">
          <span>Cadastre-se</span>
        </Link>
      </div>
    </div>
  );
}
