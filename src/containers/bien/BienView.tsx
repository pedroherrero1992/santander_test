'use client';
import React, { useEffect, useState } from 'react';
import { getRates, getVehicles } from '@/services/Services';
import Select, { SingleValue } from 'react-select';
import './BienView.css';
import { RatesI, Vehicles } from '@/auxiliar/interfaces';

interface Option {
    label: string;
    value: string;
    id?: number;
  }
export const BienView = () => {
  const [vehicles, setVehicles] = useState<Vehicles>();
  const [rates, setRates] = useState<RatesI>();
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState(1); 
  const [marcaOptions, setMarcaOptions] = useState<Option[]>([]);
  const [modeloOptions, setModeloOptions] = useState<Option[]>([]);
  const [tasasVariables, setTasasVariables] = useState({
    cuota_pura_sin_iva:"",
    cuota_pura_con_iva:"",
    tna:"",
    tea:'',
    capital_en_uvas:"",
    cftea:""

  })
  const [selectValues, setSelectValues] = useState({
    tipo: "",
    marca: "",
    año: "",
    modelo: "",
    tasa: "",
    amortizacion: "",
    cuotas: ""
  });

  const handleChange = (e: number) => {
    
    setValue(e);
  };

  // Cargar los datos de vehículos y tasas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesData = await getVehicles();
        setVehicles(vehiclesData);
        const ratesData = await getRates();
        setRates(ratesData);
        setTasasVariables(
            {   cuota_pura_sin_iva:`$ ${rates?.rates.pureEstimatedInstallmentValue}`,
            cuota_pura_con_iva:`$ ${rates?.rates.pureEstimatedInstallmentValueWithIva}`,
            tna:`${rates?.rates.tna}%`,
            tea:`${rates?.rates.tea}%`,
            capital_en_uvas:`$ ${rates?.rates.pureEstimatedInstallmentValueInUVA}`,
            cftea:`${rates?.rates.cftea}%`
        }
    )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Hubo un error al cargar los datos.');
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(vehicles);
    console.log(rates);
  }, [rates, vehicles]);

  if (error) {
    return <div>{error}</div>;
  }

  const sliderStyle = {
    background: `linear-gradient(to right, red ${value}%, #D9E8EF ${value}%)`
  };

  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (selectValues.tipo) {
      const tipoSeleccionado = vehicles?.types.find(type => type.description === selectValues.tipo);
      if (tipoSeleccionado) {
        setMarcaOptions(tipoSeleccionado.brands.map(brand => ({ label: brand.description, value: brand.description, id: brand.id })));
        setSelectValues(prev => ({ ...prev, marca: "", modelo: "" })); 
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
        .flatMap(type => type.brands)
        .find(brand => brand.description === selectValues.marca);

      if (brandSeleccionada) {
        setModeloOptions(brandSeleccionada.models.map(model => ({ label: model.description, value: model.description, id: model.id })));
        setSelectValues(prev => ({ ...prev, modelo: "" }));
      } else {
        setModeloOptions([]);
      }
    }
  }, [selectValues.marca, vehicles]);

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
 console.log(selectValues);
 
}, [selectValues])

  const selectFields = vehicles && rates ? [
    { label: "Tipo", placeh:"Ej. AUTO", value: selectValues.tipo, options: vehicles.types.map(item => ({ label: item.description, value: item.description, id: item.id })) },
    { label: "Marca",placeh:"Ej. Ford", value: selectValues.marca, options: marcaOptions },
    { label: "Año", placeh:"Año del bien",value: selectValues.año, options: vehicles.years.map(item => ({ label: item.description, value: item.description})) },
    { label: "Modelo",placeh:"Modelo del bien", value: selectValues.modelo, options: modeloOptions },
    { label: "Tasa",placeh:"Tasa/Convenio", value: selectValues.tasa, options: [{ label: "Tasa/Convenio", value: "Tasa/Convenio"}] },
    { label: "Amortización",placeh:"Amortización", value: selectValues.amortizacion, options: [{ label: "Amortización", value: "Amortización"}] },
    { label: "Cuotas",placeh:"Cuotas", value: selectValues.cuotas, options: rates.rates.terms.map(item => ({ label: `${item} cuotas`, value: `${item}`})) },
  ] : [];

  const handleSelectChange = (selectedOption: SingleValue<{ label: string; value: string; }>, field: string) => {
    setSelectValues({
      ...selectValues,
      [field]: selectedOption ? selectedOption.value : "",
    });
  };

  return (
    <div>
      <h1>Agregar bien</h1>
      <h2>Por favor completa los datos del bien</h2>

      <div className="slidecontainer">
        {rates && rates.riskEvaluation.riskEvaluationResultDTO && (
            <>
            <div>max {rates?.riskEvaluation.riskEvaluationResultDTO.finalAmount }</div>
            <div>min {rates?.riskEvaluation.riskEvaluationResultDTO.minAmount }</div>
            <div>value { rates?.riskEvaluation.riskEvaluationResultDTO.finalAmount / 100 * value < rates?.riskEvaluation.riskEvaluationResultDTO.minAmount ? rates?.riskEvaluation.riskEvaluationResultDTO.minAmount : value * rates?.riskEvaluation.riskEvaluationResultDTO.finalAmount / 100}</div>
            <div>value {value }</div>
          <input
            type="range"
            min={1}
            max={100}
            value={value}
            className="slider"
            onChange={(e) => handleChange(Number(e.target.value))}
            style={sliderStyle} // Aplicar el estilo dinámico
          />
        </>
      )}
      </div>

      {vehicles && rates &&
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
          {selectFields.map((field) => (
            <div key={field.label} className="w-1/4 p-2 m-2 border rounded relative">
              <label
                style={{
                  zIndex: 2,
                  position: 'relative',
                  top: '10px',
                  left: '20px',
                  backgroundColor: '#ffffff',
                  padding: '0px 12px 0px 12px',
                }}
              >
                {field.label}
              </label>
              <Select
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    width: '250px',
                    marginRight: "20px"
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    width: '350px',
                    zIndex: 3, // Cambiar z-index de las opciones
                  }),
                }}
                value={field.value ? { label: field.value, value: field.value } : null}
                onChange={(selectedOption) => handleSelectChange(selectedOption, field.label.toLowerCase())}
                options={field.options}
                isSearchable={true}
                placeholder={field.placeh}
              />
            </div>
          ))}
        </div>}
    </div>
  );
};
