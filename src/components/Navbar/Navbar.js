import React, { useState, useEffect, useRef } from "react";
// import imgLogo from "../../img/isotipo.png";
import imgLogo from "../../img/isotipo blanco.png"

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import SelectedCooperativa from "../SelectedCooperativa";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as CogIcon } from "../../img/icons/cog.svg";
import { ReactComponent as ChevronIcon } from "../../img/icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "../../img/icons/arrow.svg";
import { ReactComponent as MenuIcon } from "../../img/icons/menu_icon.svg";
import { ReactComponent as HomeIcon } from "../../img/icons/home.svg";
import { ReactComponent as DeleteUserIcon } from "../../img/icons/deleteUser.svg";
import { ReactComponent as UserIcon } from "../../img/icons/user.svg";
import { ReactComponent as EditUserIcon } from "../../img/icons/editUser.svg";
import LoadingComponent from "../LoadingComponent";
import styles from "./Navbar.module.css";
// import LoadingComponent from "../../LoadingComponent";

const Navbar = ({ selected = "" }) => {
  const navigate = useNavigate();
  const validate = sessionStorage.getItem("Validate");
  const status = parseInt(sessionStorage.getItem("Status"));
  const client = sessionStorage.getItem("Client");
  const user = sessionStorage.getItem("User");
  console.log("client", client);
  console.log("user", user);
  console.log(typeof client);
  console.log("validate", validate);

  function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    }, []);

    function calcHeight(el) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }

    function DropdownItem(props) {
      return (
        <button
          className={styles.menu_item}
          onClick={() => {
            if (typeof props.onClick === "function") {
              props.onClick()
            } else {
              props.goToMenu && setActiveMenu(props.goToMenu)
            }
          }
          }
        >
          <span className={styles.icon_button}>{props.leftIcon}</span>
          {props.children}
          <span className={styles.icon_right}>{props.rightIcon}</span>
        </button>
      );
    }

    return (
      <div
        className={styles.dropdown}
        style={{ height: menuHeight }}
        ref={dropdownRef}
      >
        <CSSTransition
          in={activeMenu === "main"}
          timeout={500}
          classNames={styles.menu_primary}
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className={styles.menu}>
            <DropdownItem
              leftIcon={
                client !== "" ? (
                  <SelectedCooperativa
                    logoname={client}
                    styles={{ maxHeight: "30px", margin: "0" }}
                    onclick={() => {
                      console.log("se hizo click");
                    }}
                  />
                ) : (
                  <UserIcon />
                )
              }
            >
              {client !== "" ? client : user}
            </DropdownItem>
            <DropdownItem
              leftIcon={<CogIcon />}
              rightIcon={<ChevronIcon />}
              goToMenu="settings"
            >
              Configuración
            </DropdownItem>
            <DropdownItem onClick={(e) => toLogOut(e)} leftIcon={<HomeIcon />}>
              Salir
            </DropdownItem>
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === "settings"}
          timeout={500}
          classNames={styles.menu_secondary}
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className={styles.menu_secondary}>
            <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
              <span>Opciones de usuario</span>
            </DropdownItem>
            <DropdownItem leftIcon={<EditUserIcon />}>
              Editar usuario
            </DropdownItem>
            <DropdownItem leftIcon={<DeleteUserIcon />}>
              Eliminar usuario
            </DropdownItem>
          </div>
        </CSSTransition>
      </div>
    );
  }
  function NavItem(props) {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex justify-center items-center">
        <button className={styles.icon_button} onClick={() => setOpen(!open)}>
          {props.icon}
        </button>

        {open && props.children}
      </div>
    );
  }
  const toLogOut = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    sessionStorage.setItem("Validate", "false");
    navigate("/");
  };
  const MySwal = withReactContent(Swal);
  const toReporte = (e) => {
    e.preventDefault();
    if (validate !== undefined || validate !== "") {
      if (validate === "true") {
        navigate("/reporte");
      } else {
        MySwal.fire({
          icon: "error",
          title: "No tiene permisos",
          text: "No tiene permisos para ir a este lugar",
        });
      }
    }
  };

  const toDashboard = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };
  const toPlantillas = (e) => {
    e.preventDefault();
    navigate("/plantillas");
  };
  const toRegresion = (e) => {
    e.preventDefault();
    navigate("/regresion");
  };
  const toAudio = (e) => {
    e.preventDefault();
    navigate("/audioToText");
  };
  const toManageUser = (e) => {
    e.preventDefault();
    navigate("/manageUsers");
  };
  function ExitComponent() {
    <section className={styles.btns_container}>
      <div className={`${styles.btn_container}`}>
        <button className={styles.btn_navbar} onClick={(e) => toLogOut(e)}>
          Salir
        </button>
      </div >
    </section>
  }

  if (validate === null) return <LoadingComponent />
  if (validate === "true") {
    return (<div className={styles.navbar_container_main}>
      <img className="w-20 object-contain" src={imgLogo} alt="logo_mkb"></img>
      <section className={`relative flex items-center justify-center w-full gap-2`}>
        {status === 1 ? (
          <div className={styles.btn_container}>
            <button
              className={`${selected === "manageUsers" ? "shadow-[inset_2px_2px_10px_-2px_#444444]" : "shadow-[2px_2px_10px_-2px_#444444]"} duration-500 text-slate-300 px-4 rounded-xl`}
              onClick={(e) => toManageUser(e)}
            >
              Usuarios
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.btn_container}>
          <button
            className={`${selected === "AudioToText" ? "shadow-[inset_2px_2px_10px_-2px_#444444]" : "shadow-[2px_2px_10px_-2px_#444444]"} duration-500 text-slate-300 px-4 rounded-xl`}
            onClick={(e) => toAudio(e)}
          >
            Audio a Texto
          </button>
        </div>
        <div className="">
          <button
            className={`${selected === "RegresionPage" ? "shadow-[inset_2px_2px_10px_-2px_#444444]" : "shadow-[2px_2px_10px_-2px_#444444]"} duration-500 text-slate-300 px-4 rounded-xl`}
            onClick={(e) => toRegresion(e)}
          >
            Regresión Lineal
          </button>
        </div>
        <div className="">
          <button
            className={`${selected === "DashboardPage" ? "shadow-[inset_2px_2px_10px_-2px_#444444]" : "shadow-[2px_2px_10px_-2px_#444444]"} duration-500 text-slate-300 px-4 rounded-xl`}
            onClick={(e) => toDashboard(e)}
          >
            Dashboard
          </button>
        </div>
        <div className="">
          <button
            className={`${selected === "Reportes" ? "shadow-[inset_2px_2px_10px_-2px_#444444]" : "shadow-[2px_2px_10px_-2px_#444444]"} duration-500 text-slate-300 px-4 rounded-xl`}
            onClick={(e) => toReporte(e)}
          >
            Reportes
          </button>
        </div>
        <div className="absolute right-5 flex justify-center items-center">
          <NavItem icon={<MenuIcon />}>
            <DropdownMenu />
          </NavItem>
        </div>
      </section>
    </div>)
  }
  return (<div className={styles.navbar_container_main}>
    <img className="w-20 object-contain" src={imgLogo} alt="logo_mkb"></img>
    <ExitComponent />
  </div>)

};

export default Navbar;
