import {  useState } from "react";


export type stepsType = {
    label: string;
    description: string;
    ready: boolean;
};


export const useStepperState = (
    steps_initial_state: stepsType[],
) => {
    const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState(steps_initial_state || []);

    // Go to next step.
    const handleNext = () => {
        setActiveStep((activeStep)=>activeStep + 1);
    };

    // Go to previous step.
    const handleBack = () => {
        setActiveStep((activeStep)=>activeStep - 1);
    };

    const isFirstStep = activeStep === 0;
    const isLastStep = activeStep === steps.length - 1;

    return {
        steps,
        isFirstStep,
        isLastStep,
        activeStep,
        handleNext,
        handleBack
    };
};