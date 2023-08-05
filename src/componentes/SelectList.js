import React from "react";
import { useFetch } from "../hooks/useFetch";
import Message from "./Message";

const SelectList = ({ title, url, handleChange }) => {
  const { data, error, loading } = useFetch(url);
  console.log(data, error, loading);

  if (!data) return null;
  if (error) {
    return (
      <Message
        msg={`Error ${error.status}: ${error.statusText}`}
        bgColor="#dc3545"
      />
    );
  }

  let id = `select-${title}`;
  let label = title.charAt(0).toUpperCase() + title.slice(1);
  
  //   console.log(options);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      {/* {loading &&<Loader/>} */}
      <select name={id} id={id} onChange={handleChange}>
        <option value="">Elige un {title}</option>
        {data.map((el) => (<option key={el.idProveedor} value={el.nombreProveedor}>{el.nombreProveedor}</option>))}
      </select>
    </>
  );
};

export default SelectList;
