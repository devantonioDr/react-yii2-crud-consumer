import React from 'react'
import { ClientFormWithStepper, client_form_stepper_state } from '.'
import { EfficientFormContextProvider } from '../../context/EfficientFormContextProvider'
import { DialogComponent } from '../contextDialog/UI/dialogComponent'
import DialogRequestOutCome from '../contextDialog/UI/dialogRequestOutCome'
import { DialogToggler } from '../contextDialog/UI/dialogToggler'
import { StepperContextProvider } from '../contextStepper/context/StepperContextProvider'



export function WithProvidersClientForm({keepMounted,unRegisterFields,data,title,dialogHook,feedBackDialog,submitForm,DialogOptionsComp}:any) {
  return (
    <DialogComponent
      dialogHook={dialogHook}
      title={feedBackDialog.open ? "" : title}
      keepMounted={keepMounted}
      DialogContentComp={
        <>
       
        < EfficientFormContextProvider data={data}  unRegisterFields={unRegisterFields} submitForm={submitForm as any}>

          <StepperContextProvider steps_initial_state={client_form_stepper_state}>

            {feedBackDialog.open && <DialogRequestOutCome
              type={feedBackDialog.feedBackType}
              message={feedBackDialog.message} />}

            {!feedBackDialog.open && <ClientFormWithStepper />}

          </StepperContextProvider>

          </EfficientFormContextProvider>
        </>
      }
      DialogOptionsComp={DialogOptionsComp}
    />

  
  )
}

 