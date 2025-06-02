"use client"

import "./style.css"
import { BsPersonCircle } from "react-icons/bs";
import { TbLockPassword } from "react-icons/tb";
import { IoPeopleOutline } from "react-icons/io5";
import Link from "next/link";


export default function Login() {
    return (

        <div className="container">
            <div className="icons">
                <BsPersonCircle size={85} />
            </div>
            <div className="inputs">

                <div className="item-name">
                    <div className="icon-name">
                        <IoPeopleOutline size={25} />
                    </div>
                    <input type="text" />
                </div>
                <div className="item-senha">
                    <div className="icon-senha">
                        <TbLockPassword size={25} />
                    </div>
                    <input type="password" name="password" id="" />
                </div>
                <div className="button-login">
                    <button>Login</button>
                </div>
                <Link href="/Cadastro">
                    <span>Cadastre-se</span>
                </Link>

            </div>
        </div >

    )
}