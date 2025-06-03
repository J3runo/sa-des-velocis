"use client";
import "./style.css";
import { FaHome } from "react-icons/fa";
import { MdPrecisionManufacturing } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { BsTools } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";

export default function NavBar() {
  const pathName = usePathname();

  const itens = [
    {
      label: "Home",
      page: "/Home",
      icon: <FaHome />,
    },
    {
      label: "Produção",
      page: "/Producao",
      icon: <MdPrecisionManufacturing />,
    },
    {
      label: "Estoque",
      page: "/Estoque",
      icon: <FaCar />,
    },
    {
      label: "Manutenção",
      page: "/Manutencao",
      icon: <BsTools />,
    },
    {
      label: "Qualidade",
      page: "/Qualidade",
      icon: <FaCheck />,
    },
    {
      label: "Logout",
      page: "/Login",
      icon: <CiLogout />,
    },
  ];

  return (
    <div className="content">
      <div className="Avatar">
        <FaRegUserCircle size={140} />
        <h2>Velocis</h2>
      </div>
      {itens.map((item) => (
        <Link
          key={item.label}
          href={item.page}
          className={`item ${pathName === item.page ? "selected" : ""}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
