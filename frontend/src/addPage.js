import { useState } from "react";
import { AddForm } from "./addForm";
import { InsertMap } from "./insertMap";
import { Link } from "react-router-dom";

export function AddPage() {
  const [position, setPosition] = useState();

  return (
    <div className="flex flex-row h-screen shadow">
      <InsertMap position={position} setPosition={setPosition}></InsertMap>
      <div className="flex flex-col p-2">
        <div className="flex-1">
          <AddForm position={position}></AddForm>
        </div>
        <Link to="/">
          <button>Voltar para listagem</button>
        </Link>
      </div>
    </div>
  );
}
