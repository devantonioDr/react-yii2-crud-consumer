import React, { useContext } from "react";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";

// Hooks

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import {
  StepperContext,
  StepperContextProvider,
} from "../contextStepper/context/StepperContextProvider";
import { useToggleDialog } from "../contextDialog/hooks/useToggleDialog";
import { EfficientFormContextProvider } from "../../context/EfficientFormContextProvider";
import { Form } from "../UI/Form";
import { nestObjectKeys } from "../../helper/objectHelpers";

export const ClientForm = (props:{submitForm:any}) => {
  return (
    < EfficientFormContextProvider submitForm={props.submitForm}>
      <StepperContextProvider
        steps_initial_state={[
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
        ]}
      >
        <ClientFormWithStepper />
      </StepperContextProvider>
    </EfficientFormContextProvider>
  );
};

const ClientFormWithStepper = () => {
  let stepperHook = useContext(StepperContext);

  return (
    <Form>
      <Stepper activeStep={stepperHook.activeStep} orientation="vertical">
        {stepperHook.steps.map((current_step: any, index: any) => (
          <Step key={current_step.label}>
            <StepLabel>{current_step.label}</StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <Typography>{current_step.description}</Typography>
              {(() => {
                switch (index) {
                  case 0:
                    return <Step1 />;
                  case 1:
                    return <Step2 />;
                  case 2:
                    return <Step3 />;
                  default:
                    return null;
                }
              })()}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Form>
  );
};
