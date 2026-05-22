import ComponentInput from "@/shared/components/ui/ComponentInput.tsx";
import ComponentButton from "@/shared/components/ui/ComponentButton.tsx";
import meseros from "@assets/images/meseros.png";

import { CircleUserRound, QrCode, ArrowRight } from "lucide-react";

const initform = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between bg-background max-w-md pt-9 px-7 rounded-2xl ">
      <div className="flex flex-col items-center gap-7">
        <div>
          <img src="/logo.png" alt="Login Logo" className="w-64" />
        </div>
        <div className="mt-3 text-center gap-2 flex flex-col">
          <h1>¡Bienvenido!</h1>
          <p className="text-false ">
            Por Favor ingresa tu nombre y el Código de tu mesa para comenzar
          </p>
        </div>
        <div className="flex flex-col gap-4 border-red-400 w-full">
          <ComponentInput
            placeholder="Ingresa tu nombre"
            label="Tu nombre"
            type="text"
            labelClassName="text-one"
            activeClassName="focus-within:ring-item"
            icon={CircleUserRound}
          />
          <ComponentInput
            placeholder="En el QR encontraras el código"
            label="Código mesa"
            type="text"
            labelClassName="text-one"
            activeClassName="focus-within:ring-item"
            icon={QrCode}
          />
          <div className="mt-3">
            <ComponentButton text="Continuar" icon={ArrowRight} />
          </div>
        </div>
      </div>
      <div>
        <img src={meseros} alt="" />
      </div>
    </div>
  );
};

export default initform;
