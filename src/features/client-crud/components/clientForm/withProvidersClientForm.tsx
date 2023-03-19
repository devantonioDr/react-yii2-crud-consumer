import React from 'react'
import { ClientFormWithStepper, client_form_stepper_state } from '.'
import { EfficientFormContextProvider } from '../../context/EfficientFormContextProvider'
import { DialogComponent } from '../contextDialog/UI/dialogComponent'
import DialogRequestOutCome from '../contextDialog/UI/dialogRequestOutCome'
import { DialogToggler } from '../contextDialog/UI/dialogToggler'
import { StepperContextProvider } from '../contextStepper/context/StepperContextProvider'



export function WithProvidersClientForm({ keepMounted, data,unRegisterFields, title, dialogHook, feedBackDialog, submitForm, DialogOptionsComp }: any) {
  return (<>

    {dialogHook.open && <EfficientFormContextProvider data={data} unRegisterFields={unRegisterFields} submitForm={submitForm as any}>
      <StepperContextProvider steps_initial_state={client_form_stepper_state}>
        <DialogComponent
          dialogHook={dialogHook}
          title={feedBackDialog.open ? "" : title}
          keepMounted={keepMounted}
          DialogContentComp={
            <>
              {feedBackDialog.open && <DialogRequestOutCome
                type={feedBackDialog.feedBackType}
                message={feedBackDialog.message} />}

              {!feedBackDialog.open && <ClientFormWithStepper />}
            </>
          }
          DialogOptionsComp={!feedBackDialog.open && DialogOptionsComp}
        />
      </StepperContextProvider>
    </EfficientFormContextProvider>}
  </>
  )
}

