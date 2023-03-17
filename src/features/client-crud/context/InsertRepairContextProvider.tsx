import { createContext, memo, useContext } from "react";
import { InsertClientDialog } from "../components/insertClientDialog";

import { stepsType } from "../components/contextStepper/hooks/useStepperState";
import { useToggleDialog } from "../components/contextDialog/hooks/useToggleDialog";

import { EfficientFormContext } from "./EfficientFormContextProvider";
import { StepperContextProvider } from "../components/contextStepper/context/StepperContextProvider";

const steps_initial_state: stepsType[] = [
  {
    label: "Datos de la Reparación",
    description: "",
    ready: false,
  },
  {
    label: "Datos del cliente",
    description: "",
    ready: false,
  },
  {
    label: "Folio del servicio, costos",
    description: `Folio del servicio, costos`,
    ready: false,
  },
];


interface InsertRepairContextValue {
  dialogHook: ReturnType<typeof useToggleDialog>;
}

export const InsertRepairContext = createContext<InsertRepairContextValue>(
  {} as InsertRepairContextValue
);

export const InsertRepairContextProvider = (props: any) => {
  // Mui Stepper hook.
  
  // Mui Dialog hook.
  const dialogHook = useToggleDialog();

  // To make the dialog full screen on mobile devices.

  const contextValue: InsertRepairContextValue = {
    dialogHook,
  };
  return (
    <>
      <InsertRepairContext.Provider value={contextValue}>
        <StepperContextProvider steps_initial_state={steps_initial_state}>
        <InsertClientDialog />
        {props.children}
        </StepperContextProvider>
      </InsertRepairContext.Provider>
    </>
  );
};
