import { createContext, useEffect } from "react";
import { useStepperState } from "../hooks/useStepperState";




export const StepperContext = createContext<any>(
  {}
);

export const StepperContextProvider = (props: any) => {
  // Mui Stepper hook.
  const stepperHook = useStepperState(props.steps_initial_state);

  return (
    <>
      <StepperContext.Provider value={stepperHook}>
        {props.children}
      </StepperContext.Provider>
    </>
  );
};
