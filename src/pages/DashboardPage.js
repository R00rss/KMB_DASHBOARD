import React, { useEffect, useState } from "react";
import Dashboard2 from "../components/Dashboard2";
import Dashboard3 from "../components/Dashboard3";
import Dashboard4 from "../components/Dashboard4";
import Dashboard5 from "../components/AnalisisLlamadasEstados/Dashboard5";
import LoadingComponent from "../components/LoadingComponent";
import Navbar from "../components/Navbar/Navbar";
import SelectDateDashboard from "../components/SelectDateDashboard";
import SelectGlobal from "../components/SelectGlobal";
import "./DashboardPage.css";
import FailPage from "./FailPage";
import useTitle from "../hooks/useTitle";
import NavbarDashboards from "../components/Dashboards/NavbarDashboards";
import AnalisisIndividual from "../components/Dashboards/AnalisisIndividual";
// import HeatMap from "./HeatMapExternal/HeatMap";

function DashboardPage() {
  const { get_title } = useTitle("KMB | Dashboard");
  const [dataAgente, setDataAgente] = useState({});
  const [dataCooperativa, setDataCooperativa] = useState({});
  const [data, setData] = useState({});
  const [dataPie, setDataPie] = useState({});
  const [selected, setSelected] = useState({});

  const [dashboard_options, set_dashboard_options] = useState({
    dashboard1: true,
    dashboard2: false,
    dashboard3: false,
    dashboard4: false,
    dashboard5: false,
  })
  const [loading, setLoading] = useState(false);
  const validate = sessionStorage.getItem("Validate");
  const status = parseInt(sessionStorage.getItem("Status"));
  let client = sessionStorage.getItem("Client");
  if (client === "") {
    client = null;
  }

  function handle_change_dashboard(dashboard) {
    const clone = JSON.parse(JSON.stringify(dashboard_options))
    Object.keys(clone).forEach((key) => clone[key] = key === dashboard)
    set_dashboard_options(clone)
  }

  function formatData(data_) {
    let dataResult = [{}];
    var data_diario_global = [];
    var data_diario_global_cooperativa = [];
    var data_llamadas_global = [];
    var data_llamadas_global_cooperativa = [];
    var data_llamadas_mes = [];
    var data_llamadas_mes_cooperativa = [];
    //var data_llamadas_global_cooperativa = [];
    var x = [];
    for (const [key, value] of Object.entries(data_)) {
      if (key === "dias") {
        value.forEach((dia, i) => {
          x.push(dia);
        });
      }
      if (/^llamadas_diario_mes_((0[1-9])|1[0-2])$/.test(key)) {
        value.forEach((llamada_global, i) => {
          if (llamada_global.length !== 0) {
            data_diario_global.push({ x: x[i], y: llamada_global[0][1] });
          } else {
            data_diario_global.push({ x: x[i], y: 0 });
          }
        });
      }
      if (/^llamadas_diario_mes_((0[1-9])|1[0-2])_cooperativa_/.test(key)) {
        value.forEach((llamada_cooperativa, i) => {
          if (llamada_cooperativa.length !== 0) {
            data_diario_global_cooperativa.push({
              x: x[i],
              y: llamada_cooperativa[0][1],
            });
          } else {
            data_diario_global_cooperativa.push({ x: x[i], y: 0 });
          }
        });
      }
      if (/^llamadas_global$/.test(key)) {
        value.forEach((llamadas_global, i) => {
          if (llamadas_global.length !== 0) {
            data_llamadas_global.push({
              id: llamadas_global[0],
              value: llamadas_global[1],
              label: llamadas_global[0],
              color: "hsl(95, 70%, 50%)",
            });
          }
        });
      }
      if (/^llamadas_global_cooperativa_/.test(key)) {
        value.forEach((llamadas_global, i) => {
          if (llamadas_global.length !== 0) {
            data_llamadas_global_cooperativa.push({
              id: llamadas_global[0],
              value: llamadas_global[1],
              label: llamadas_global[0],
              color: "hsl(95, 70%, 50%)",
            });
          }
        });
      }
      if (/^llamadas_mes_((0[1-9])|1[0-2])$/.test(key)) {
        value.forEach((llamadas_global, i) => {
          if (llamadas_global.length !== 0) {
            data_llamadas_mes.push({
              id: llamadas_global[0],
              value: llamadas_global[1],
              label: llamadas_global[0],
              color: "hsl(95, 70%, 50%)",
            });
          }
        });
      }
      if (/^llamadas_mes_((0[1-9])|1[0-2])_/.test(key)) {
        value.forEach((llamadas_global, i) => {
          if (llamadas_global.length !== 0) {
            data_llamadas_mes_cooperativa.push({
              id: llamadas_global[0],
              value: llamadas_global[1],
              label: llamadas_global[0],
              color: "hsl(95, 70%, 50%)",
            });
          }
        });
      }
    }
    dataResult[0] = {
      id: "Llamadas Cooperativa",
      data: data_diario_global_cooperativa,
    };
    dataResult[1] = { id: "Llamadas Totales", data: data_diario_global };

    const dataTotal = {
      data_lineal: [dataResult[0], dataResult[1]],
      data_pie: [
        data_llamadas_global,
        data_llamadas_global_cooperativa,
        data_llamadas_mes,
        data_llamadas_mes_cooperativa,
      ],
    };
    console.log("data result es: ", dataResult);
    console.log("data diario global es: ", data_diario_global_cooperativa);
    return dataTotal;
  };
  function getDataAgente() {
    setLoading(true);
    fetch("/api/dataDashboard")
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          alert("Error", resp.status);
        }
      })
      .then((data_) => {
        console.log("data para dashboard", data_);
        if (data_ !== "") {
          const auxData = formatData(data_["data"]);
          setData(auxData["data_lineal"]);
          setDataPie(auxData["data_pie"]);
          setSelected({
            agente: data_["data"]["agente"],
            cooperativa: data_["data"]["cooperativa"],
            mes: data_["data"]["mes"],
          });
          setLoading(false);
        } else {
          alert("Error, la data no contiene nada, ");
          setLoading(false);
        }
      });
  }
  useEffect(() => {
    fetch("/api/agentes")
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        return null
      })
      .then((data_) => {
        if (!data_) return
        setDataAgente(data_);
      }); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (status === 3) {
      setDataCooperativa([client]);
      return
    }


    if ((status === 1) | (status === 2))
      fetch("/api/cooperativas")
        .then((resp) => {
          if (resp.status === 200) return resp.json();
          return null
        })
        .then((data_) => {
          if (data_ === null) return
          setDataCooperativa(data_);
          console.log("cooperativas", dataCooperativa);
        });

    // eslint-disable-next-line
  }, []);


  const GeneratePage = () => {
    return (
      <div className="min-h-screen">
        <Navbar selected={"DashboardPage"} />
        <NavbarDashboards
          dashboard_options={dashboard_options}
          handle_change_dashboard={handle_change_dashboard}
          status={status}
        />
        {dashboard_options.dashboard1 && (
          <>
            <div className="selects__container">
              <SelectGlobal
                data={dataAgente}
                defaultOption={"Ingrese un Agente"}
                sendDataName="Agent"
                title="Seleccione un Agente"
              />
              <SelectGlobal
                data={dataCooperativa}
                defaultOption={"Ingrese una cooperativa"}
                sendDataName="CooperativaDashboard"
                title="Seleccione una Cooperativa"
              />
              <SelectDateDashboard />
            </div>
            <div className="dashboarpage__calcular__btn__container">
              <button
                onClick={() => getDataAgente()}
                className="dashboarpage__calcular__btn px-2"
              >
                Calcular Eficiencia Individual
              </button>
            </div>
            <div className="dashboard__container col-12">
              {loading === true ? (
                <LoadingComponent />
              ) : (
                <AnalisisIndividual
                  data={data}
                  dataInfo={selected}
                  dataPie={dataPie}
                  client={client}
                />
              )}
            </div>
          </>
        )}

        {dashboard_options.dashboard2 && <Dashboard2 client={client} />}
        {dashboard_options.dashboard3 && <Dashboard3 client={client} />}
        {dashboard_options.dashboard4 && <Dashboard4 client={client} />}
        {dashboard_options.dashboard5 && <Dashboard5 client={client} />}

      </div>
    );
  };

  console.log(status, validate, client)
  // return <>test</>

  if (validate === "false") return <FailPage />
  if (status !== 3) return <GeneratePage />;
  if (client === null) return <FailPage />;
  return <GeneratePage />;

};

export default DashboardPage;
