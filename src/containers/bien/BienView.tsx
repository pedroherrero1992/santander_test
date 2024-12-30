"use client";
import React, { useEffect, useState } from "react";
import { getRates, getVehicles } from "@/services/Services";
import Select, { SingleValue } from "react-select";
import "./BienView.css";
import { RatesI, Vehicles } from "@/auxiliar/interfaces";
import { GoPencil } from "react-icons/go";
import { EditNumber } from "@/components/editNumber/EditNumber";
import Breadcrumb from "@/components/breadCrumb/BreadCrumb";
import { useMyContext } from "@/contexs/Context";

interface Option {
  label: string;
  value: string;
  id?: number;
}
export const BienView = () => {
  const { addData } = useMyContext();
  const [vehicles, setVehicles] = useState<Vehicles>();
  const [rates, setRates] = useState<RatesI>();
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<number>(1);
  const [marcaOptions, setMarcaOptions] = useState<Option[]>([]);
  const [modeloOptions, setModeloOptions] = useState<Option[]>([]);
  const [openEditNumber, setOpenEditNumber] = useState(false);
  const [bgColor, setBgColor] = useState("white");
  const [bgColorSave, setBgColorSave] = useState("red");
  const breadcrumbPaths = ['Volver', 'Simulacion', 'Agregar bien'];
  const [tasasVariables, setTasasVariables] = useState({
    cuota_pura_sin_iva: "",
    cuota_pura_con_iva: "",
    tna: "",
    tea: "",
    capital_en_uvas: "",
    cftea: "",
    valor_uva_hoy: "",
  });
  const [selectValues, setSelectValues] = useState({
    tipo: "",
    marca: "",
    anno: "",
    modelo: "",
    tasa: "",
    amortizacion: "",
    cuotas: "",
  });

  const handleChange = (e: number) => {
    setValue(e);
  };
  const isFormValid = () => {
    return Object.values(selectValues).every(value => value !== ""); // Verifica si todos los valores están completos
  };

  // Cargar los datos de vehículos y tasas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesData = await getVehicles();
        setVehicles(vehiclesData);
        const ratesData = await getRates();
        setRates(ratesData);
        setTasasVariables({
          cuota_pura_sin_iva: `$ ${transformarNumero(
            ratesData?.rates.pureEstimatedInstallmentValue
          )}`,
          cuota_pura_con_iva: `$ ${transformarNumero(
            ratesData?.rates.pureEstimatedInstallmentValueWithIva
          )}`,
          tna: `${transformarNumero(ratesData?.rates.tna)}%`,
          tea: `${transformarNumero(ratesData?.rates.tea)}%`,
          capital_en_uvas: `$ ${transformarNumero(
            ratesData?.rates.pureEstimatedInstallmentValueInUVA
          )}`,
          cftea: `${transformarNumero(ratesData?.rates.cftea)}%`,
          valor_uva_hoy: `$ ${transformarNumero(
            ratesData?.rates.uvaCurrentValue
          )}`,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Hubo un error al cargar los datos.");
      }
    };

    fetchData();

  }, []);

  useEffect(() => {
    console.log(vehicles);
    console.log(rates);
  }, [rates, vehicles]);

  if (error) {
    return <div>{error}</div>;
  }

  const sliderStyle = {
    background: `linear-gradient(to right, red ${value}%, #D9E8EF ${value}%)`,
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (selectValues.tipo) {
      const tipoSeleccionado = vehicles?.types.find(
        (type) => type.description === selectValues.tipo
      );
      if (tipoSeleccionado) {
        setMarcaOptions(
          tipoSeleccionado.brands.map((brand) => ({
            label: brand.description,
            value: brand.description,
            id: brand.id,
          }))
        );
        setSelectValues((prev) => ({ ...prev, marca: "", modelo: "" }));
      } else {
        setMarcaOptions([]);
      }
    }
  }, [selectValues.tipo, vehicles]);

  // Filtrar modelos dependiendo de la marca seleccionada
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (selectValues.marca) {
      const brandSeleccionada = vehicles?.types
        .flatMap((type) => type.brands)
        .find((brand) => brand.description === selectValues.marca);

      if (brandSeleccionada) {
        setModeloOptions(
          brandSeleccionada.models.map((model) => ({
            label: model.description,
            value: model.description,
            id: model.id,
          }))
        );
        setSelectValues((prev) => ({ ...prev, modelo: "" }));
      } else {
        setModeloOptions([]);
      }
    }
  }, [selectValues.marca, vehicles]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log(selectValues);
  }, [selectValues]);

  const selectFields =
    vehicles && rates
      ? [
        {
          label: "Tipo",
          ref: "tipo",
          placeh: "Ej. Máquina Agrícola",
          value: selectValues.tipo,
          options: vehicles.types.map((item) => ({
            label: item.description,
            value: item.description,
            id: item.id,
          })),
        },
        {
          label: "Marca",
          ref: "marca",
          placeh: "Ej. Ford",
          value: selectValues.marca,
          options: marcaOptions,
        },
        {
          label: "Año",
          ref: "anno",
          placeh: "Año del bien",
          value: selectValues.anno,
          options: vehicles.years.map((item) => ({
            label: item.description,
            value: item.description,
          })),
        },
        {
          label: "Modelo",
          ref: "modelo",
          placeh: "Modelo del bien",
          value: selectValues.modelo,
          options: modeloOptions,
        },
        {
          label: "Tasa",
          ref: "tasa",
          placeh: "Tasa/Convenio",
          value: selectValues.tasa,
          options: [{ label: "Tasa/Convenio", value: "Tasa/Convenio" }],
        },
        {
          label: "Amortización",
          ref: "amortizacion",
          placeh: "Amortización",
          value: selectValues.amortizacion,
          options: [{ label: "Amortización", value: "Amortización" }],
        },
        {
          label: "Cuotas",
          ref: "cuotas",
          placeh: "Cuotas",
          value: selectValues.cuotas,
          options: rates.rates.terms.map((item) => ({
            label: `${item} cuotas`,
            value: `${item}`,
          })),
        },
      ]
      : [];

  const handleSelectChange = (
    selectedOption: SingleValue<{ label: string; value: string }>,
    field: string
  ) => {
    setSelectValues({
      ...selectValues,
      [field]: selectedOption ? selectedOption.value : "",
    });
  };

  const transformarNumero = (numero: number | undefined) => {
    return numero ? numero.toString().replace(".", ",") : numero;
  };

  const agregarPuntoCadaTres = (numero: number) => {
    const [entero, decimales] = numero.toString().split(".");
    const enteroFormateado = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (decimales) {
      const decimalesFormateados = decimales.length === 1 ? `${decimales}0` : decimales;
      return `${enteroFormateado},${decimalesFormateados}`;
    }

    // Si no hay decimales, solo devolvemos el entero
    return enteroFormateado;
  };

  const transformarNumeroTitulo = (numero: number) => {
    console.log(numero);

    // Convertir el número a cadena y dividir en parte entera y decimales
    const [entero, decimales] = numero.toString().split(".");

    // Si no hay decimales, asignar ",00"
    let decimalesFinales = decimales ? decimales : "00";

    // Si los decimales tienen solo un dígito, agregar un cero
    if (decimalesFinales.length === 1) {
      decimalesFinales += "0";
    }

    // Agregar puntos cada tres dígitos en la parte entera
    const enteroFormateado = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    return (
      <div className="divWraperFS" style={{ justifyContent: "center" }}>
        <span>
          <span style={{ fontSize: "30px" }}>${enteroFormateado}</span>
          <span style={{ fontSize: "20px" }}>,</span>
          <span style={{ fontSize: "20px" }}>
            {decimalesFinales.slice(0, 2)}
          </span>
        </span>
        <GoPencil
          onClick={() => {
            setOpenEditNumber(true);
          }}
          style={{
            fontSize: 30,
            color: "#82B5CA",
            backgroundColor: "#F5F9FA",
            padding: 5,
            borderRadius: 50,
            cursor: "pointer",
          }}
        />
      </div>
    );
  };
  const handleSave = () => {
    if (
      rates && 
      selectValues.tipo &&
      selectValues.marca &&
      selectValues.anno &&
      selectValues.modelo &&
      selectValues.tasa &&
      selectValues.amortizacion &&
      selectValues.cuotas
    ) {
      const newBien = {
        tipo: selectValues.tipo,
        marca: selectValues.marca,
        anno: selectValues.anno,
        modelo: selectValues.modelo,
        tasa: selectValues.tasa,
        amortizacion: selectValues.amortizacion,
        cuotas: selectValues.cuotas,
        montoFinanciar: rates?.riskEvaluation.riskEvaluationResultDTO.finalAmount /
        100 *
        value <
        rates?.riskEvaluation.riskEvaluationResultDTO.minAmount
        ? rates?.riskEvaluation.riskEvaluationResultDTO.minAmount
        : (value *
          rates?.riskEvaluation.riskEvaluationResultDTO
            .finalAmount) /
        100, 
      };

      addData(newBien); // Guardamos los datos en el contexto

      alert("Bien guardado correctamente!");
      setSelectValues({
        tipo: "",
        marca: "",
        anno: "",
        modelo: "",
        tasa: "",
        amortizacion: "",
        cuotas: "",
      });
      setValue(1); // Resetear el valor del slider
    } else {
      alert("Por favor complete todos los campos.");
    }
  };
  return (
    <div style={{ maxWidth: 1220, padding: 10 }}>
      <Breadcrumb paths={breadcrumbPaths} />
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: 20 }}>Agregar bien</h1>
      <h2 style={{ fontSize: '18px', color: "grey", marginTop: 20 }}>Por favor completa los datos del bien:</h2>

      <div className="slideContainer">
        {rates && rates.riskEvaluation.riskEvaluationResultDTO && (
          <>

            <div style={{ textAlign: "center" }}>
              Monto a financiar:{" "}
              {transformarNumeroTitulo(
                (rates?.riskEvaluation.riskEvaluationResultDTO.finalAmount /
                  100) *
                  value <
                  rates?.riskEvaluation.riskEvaluationResultDTO.minAmount
                  ? rates?.riskEvaluation.riskEvaluationResultDTO.minAmount
                  : (value *
                    rates?.riskEvaluation.riskEvaluationResultDTO
                      .finalAmount) /
                  100
              )}
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={value}
              className="slider"
              onChange={(e) => handleChange(Number(e.target.value))}
              style={sliderStyle}
            />

            <div className="divWraperSB">
              <div style={{ fontWeight: 'bold' }}>
                Mínimo: ${agregarPuntoCadaTres(rates?.riskEvaluation.riskEvaluationResultDTO.minAmount)}
              </div>
              <div>
                <span style={{ marginRight: 20, fontWeight: "bold" }}>

                  Máximo: ${agregarPuntoCadaTres(rates?.riskEvaluation.riskEvaluationResultDTO.finalAmount)}
                </span>
                <span style={{ fontWeight: 'bold' }}>

                  Total: ${agregarPuntoCadaTres(4000000)}
                </span>


              </div>
            </div>

          </>
        )}
      </div>

      {vehicles && rates && (
        <div className="divWraperFS" style={{ marginBottom: 35 }}>
          {selectFields.map((field) => (
            <div
              key={field.label}
              className="w-1/4 p-2 m-2 rounded relative"
            >
              <label
                style={{
                  zIndex: 2,
                  position: "relative",
                  top: "10px",
                  left: "5px",
                  backgroundColor: "#ffffff",
                  padding: "0px 5px 0px 5px",
                  color: "#78AFC6"
                }}
              >
                {field.label}
              </label>
              <Select
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    width: "280px",
                    marginRight: "20px",
                    borderColor: "#78AFC6"
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    width: "350px",
                    zIndex: 3, // Cambiar z-index de las opciones
                  }),
                }}
                value={
                  field.value
                    ? { label: field.value, value: field.value }
                    : null
                }
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, field.ref)
                }
                options={field.options}
                isSearchable={true}
                placeholder={field.placeh}
              />
            </div>
          ))}
        </div>
      )}

      <div className="divWraperSB">
        <p style={{ width: 250 }}>Cuota pura estimada sin IVA: {tasasVariables.cuota_pura_sin_iva}</p>
        <p style={{ width: 250 }}>Cuota pura estimada con IVA: {tasasVariables.cuota_pura_con_iva}</p>
        <p>TNA: {tasasVariables.tna}</p>
        <p>TEA: {tasasVariables.tea}</p>
        <p>CFTEA: {tasasVariables.cftea}</p>
      </div>
      <div className="divWraperSB">
        <p style={{ width: 250 }}>Capital en UVAs: {tasasVariables.capital_en_uvas}</p>
        <p style={{ width: 250 }}>TNA: {tasasVariables.tna}</p>
        <p>TEA: {tasasVariables.tea}</p>
        <p>CFTEA: {tasasVariables.cftea}</p>
        <p>Valor UVA hoy: {tasasVariables.valor_uva_hoy} </p>
      </div>

      <div className="divWraperFE">
        <button
          onClick={() => { window.alert("Cancelar") }}
          className="primary"
          style={{ backgroundColor: bgColor, color: bgColor !== "white" ? "white" : "black", }}

          onMouseEnter={() => {
            setBgColor("#FF6262");
          }}
          onMouseLeave={() => {
            setBgColor("white");
          }}
        >
          Cancelar
        </button>

        <button
          onClick={() => { handleSave() }}
          className="secondary"
          style={{
            backgroundColor: isFormValid() ? bgColorSave : "#D3D3D3",  
            cursor: isFormValid() ? "pointer" : "not-allowed", 
          }}
          disabled={!isFormValid()} // Deshabilitar si el formulario no es válido
          onMouseEnter={() => { setBgColorSave("#FF6262"); }}
          onMouseLeave={() => { setBgColorSave("red"); }}
        >
          Guardar
        </button>
      </div>



      {rates && (
        <EditNumber
          isOpen={openEditNumber}
          max={rates?.riskEvaluation.riskEvaluationResultDTO.finalAmount}
          min={rates?.riskEvaluation.riskEvaluationResultDTO.minAmount}
          setValue={setValue}
          onClose={() => {
            setOpenEditNumber(false);
          }}
        />
      )}
    </div>
  );
};
