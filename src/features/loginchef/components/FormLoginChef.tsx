import ComponentInput from "@/shared/components/ui/ComponentInput.tsx";
import ComponentButton from "@/shared/components/ui/ComponentButton.tsx";

import { CircleUser, KeySquare, ArrowRight } from "lucide-react";
import meseros from "@/assets/images/meseros.png";

const FormLoginChef = () => {
  return (
    <div className="w-full flex flex-col items-center justify-between bg-one px-12 pt-8 rounded-2xl gap-6 max-w-md border border-black/5 shadow-lg">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className=" text-two">¡Bienvenido!</h1>
        <p className="text-secondary text-sm leading-relaxed">
          Por Favor ingresa tu usuario y contraseña para comenzar
        </p>
        <div className="flex flex-col w-full gap-6">
          <ComponentInput
            placeholder="Ingresa tu usuario"
            label="Tu usuario"
            labelClassName="text-two"
            activeClassName="focus-within:ring-item"
            icon={CircleUser}
          />
          <ComponentInput
            placeholder="Ingresa tu contraseña"
            label="Tu contraseña"
            type="password"
            labelClassName="text-two"
            activeClassName="focus-within:ring-item"
            icon={KeySquare}
          />
          <div className="flex items-center justify-end mt-2">
          <ComponentButton
            text="Iniciar sesión"
            color="bg-item"
            icon={ArrowRight}
          />
          </div>
        </div>
      </div>
      <img
        src={meseros}
        alt="Login Image"
      />
    </div>
  );
};

export default FormLoginChef;