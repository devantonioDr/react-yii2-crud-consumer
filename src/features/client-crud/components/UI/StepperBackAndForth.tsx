import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { memo, useContext } from "react";
import { EfficientFormContext } from "../../context/EfficientFormContextProvider";
import { StepperContext } from "../contextStepper/context/StepperContextProvider";
import { useCallback } from "react";






const BackButtonMemoized = memo(({ isFirstStep, handleBack }: any) => {
  return (
    <Button disabled={isFirstStep} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
      Atras
    </Button>
  )
})
const BackButton = (props: any) => {
  const { isFirstStep, handleBack } = useContext(StepperContext);
  return (
    <BackButtonMemoized isFirstStep={isFirstStep} handleBack={handleBack} />
  );
};

const NextButtonMemoized = memo(({ onNext }: any) => {
  return (
    <Button variant="contained" onClick={onNext} sx={{ mt: 1, mr: 1 }}>
      Siguiente
      <ArrowRightIcon />
    </Button>
  )
});


const TriggerFormAcctionButton = memo(({ onNext }: any) => {
  return (
    <Button variant="contained" onClick={onNext} sx={{ mt: 1, mr: 1 }}>
      Guardar cambios
      <ArrowRightIcon />
    </Button>
  )
});


const NextButton = (props: any) => {
  const { executeAllValidators, onSubmit } = useContext(EfficientFormContext);
  const stepperHook = useContext(StepperContext);


  const checkIfErrors = () => {
    let satisfy = props.satisfy;

    let haveErrors = executeAllValidators(satisfy);

    return haveErrors;
  }

  const onNext = useCallback(() => {
    if (checkIfErrors()) return;

    // Go next if it doesn't have errors.
    stepperHook.handleNext();
  }, []);

  const beforeSubmit = (event:any) => {
    if (checkIfErrors()) return;

    onSubmit(event);
  }



  if (stepperHook.isLastStep) {
    return <TriggerFormAcctionButton onNext={beforeSubmit} />
  };

  return (
    <NextButtonMemoized onNext={onNext} />
  );
};

export const StepperBackAndForth = ({ satisfy }: { satisfy?: string[] }) => {
  return (
    <Box sx={{ mb: 2, mt: 3 }}>
      <BackButton />
      <NextButton satisfy={satisfy} />
    </Box>
  );
};
