import { api } from "./api";
import { RequiredIndicator } from "./requiredIndicator";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export function AddForm({ position }) {
  const { register, handleSubmit, reset } = useForm();
  const [success, setSuccess] = useState(false);

  async function onSubmit(data) {
    data.lat = position.lat();
    data.lng = position.lng();
    await api.post("/bloodCenters", data);
    reset();
    setSuccess(true);
  }

  return (
    <div className="p-4 flex flex-col gap-2 z-10 h-full justify-center">
      {success && <Navigate to="/" replace={true} />}
      <h1 className="text-lg">Adicionar Hemonúcleo</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-2"
      >
        <label>
          Nome <RequiredIndicator></RequiredIndicator>
          <input type="text" {...register("name", { required: true })} />
        </label>
        <label>
          Email <RequiredIndicator></RequiredIndicator>
          <input type="email" {...register("email")} />
        </label>
        {position && (
          <>
            <input name="lat" type="hidden" value={position.lat()}></input>
            <input name="lng" type="hidden" value={position.lng()}></input>
          </>
        )}
        <button type="submit" disabled={!position} className="common-button">
          Enviar
        </button>
        {!position && <div>Clique no mapa para selecionar o local</div>}
      </form>
    </div>
  );
}
