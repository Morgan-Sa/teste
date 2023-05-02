import { useState } from "react";
import { DisplayMap } from "./displayMap";
import { CenterDetails } from "./centerDetails";

import { Link } from "react-router-dom";

export function ListPage() {
  const [selected, setSelected] = useState();

  return (
    <div className="flex flex-row h-screen">
      <DisplayMap setSelected={setSelected}></DisplayMap>
      <div className="flex flex-col p-2">
        <div className="flex-1">
          <CenterDetails center={selected}></CenterDetails>
        </div>
        <Link to={"/add"}>
          <button>Adicionar Hemonúcleo</button>
        </Link>
      </div>
    </div>
  );
}
