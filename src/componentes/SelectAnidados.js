import React, { useState } from "react";
import SelectList from "./SelectList";

function SelectAnidados() {
  const [proveedor, setProveedor] = useState("");

  
  return (
    <div>
      <h2>SelectAnidados</h2>
      <h3>Proveedor</h3>
      <SelectList
        title="proveedor"
        url={"http://localhost:8000/proveedor"}
        handleChange={(e) => {
          setProveedor(e.target.value);
        }}
      />
      
      <pre>
        <code>{proveedor}</code>
      </pre>
    </div>
  );
}

export default SelectAnidados;
