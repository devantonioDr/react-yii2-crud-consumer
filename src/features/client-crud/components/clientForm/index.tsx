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
} from "../contextStepper/context/StepperContextProvider";

import { Form } from "../UI/Form";
import Box from "@mui/material/Box";






export const client_form_stepper_state = [
  {
    label: "Datos principales del cliente",
    description: "",
    ready: false,
  },
  {
    label: "Perfil del cliente",
    description: "",
    ready: false,
  },
  {
    label: "Dirección del cliente",
    description: "",
    ready: false,
  },
]

const FormGridContainer = ({children}:any) => {
  return (
    <Box sx={{ marginRight: "20px", mt: 2 , maxWidth:'540px'}} >
      {children}
    </Box>
  )
}

export const ClientFormWithStepper = () => {
  let stepperHook = useContext(StepperContext);

  return (
    <Form >
      <Stepper activeStep={stepperHook.activeStep} orientation="vertical">
        {stepperHook.steps.map((current_step: any, index: any) => (
          <Step key={current_step.label}>
            <StepLabel>{current_step.label}</StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <Typography>{current_step.description}</Typography>

              <FormGridContainer>
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
              </FormGridContainer>

            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Form>
  );
};
