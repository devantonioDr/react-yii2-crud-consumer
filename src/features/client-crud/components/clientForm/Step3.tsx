import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { FormInput } from "../UI/FormInput";
import { StepperBackAndForth } from "../UI/StepperBackAndForth";
import { notEmptyValidator } from "../../utils/formValidators";

function Step3() {
  return (
    <>
      <Grid container columns={12} spacing={2}>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="Dirección Línea 1"
            name="address.address_line_1"
            validators={[notEmptyValidator]}
            validateAsTyping={true}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <FormInput
            label="Línea de dirección 2"
            name="address.address_line_2"
            validators={[]}
            validateAsTyping={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="Ciudad"
            name="address.city"
            validators={[notEmptyValidator]}
            validateAsTyping={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="Estado"
            name="address.state"
            validators={[notEmptyValidator]}
            validateAsTyping={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="País"
            name="address.country"
            validators={[notEmptyValidator]}
            validateAsTyping={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="Código postal"
            name="address.zip_code"
            validators={[notEmptyValidator]}
            validateAsTyping={true}
          />
        </Grid>
      </Grid>
      
      <StepperBackAndForth
        satisfy={[
          "address.address_line_1",
          "address.address_line_2",
          "address.city",
          "address.state",
          "address.country",
          "address.zip_code",
        ]}
      />
    </>
  );
}

export default Step3;
