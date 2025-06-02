import { BsCalendar2Date, BsPersonCircle } from 'react-icons/bs'
import './style.css'
import { IoPeopleOutline } from 'react-icons/io5'
import { TbLockPassword } from 'react-icons/tb'
import { MdOutlineDriveFileRenameOutline, MdOutlineEmail } from 'react-icons/md'

export default function cadastro() {
    return(
        <div className="container">
            <div className="icons">
                <BsPersonCircle size={85} />
            </div>
            <div className="inputs">

                <div className="itens-1">
                    <div className="icon-name">
                        <MdOutlineDriveFileRenameOutline size={25} />
                    </div>
                    <input type="text" />
                </div>
                <div className="itens-2">
                    <div className="icon-email">
                        <MdOutlineEmail size={25} />
                    </div>
                    <input type="text" />
                </div>
                <div className="itens-3">
                    <div className="icon-date">
                        <BsCalendar2Date size={23} />
                    </div>
                    <input type="date" />
                </div>
                <div className="itens-4">
                    <div className="icon-password">
                        <TbLockPassword size={25} />
                    </div>
                    <input type="password" name="password" id="" />
                </div>
                <div className="button-login">
                    <button>Salvar</button>
                </div>
    
            </div>
        </div >
    )
}