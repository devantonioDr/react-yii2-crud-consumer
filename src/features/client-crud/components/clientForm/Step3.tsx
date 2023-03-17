import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { FormInput } from "../UI/FormInput";
import { StepperBackAndForth } from "../UI/StepperBackAndForth";
import { notEmptyValidator } from "../../utils/formValidators";

function Step3() {
  return (
    <Box sx={{ marginRight: "20px", mt: 2 }}>
      <Grid container columns={12} spacing={2}>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="Address Line 1"
            name="address.address_line_1"
            validators={[notEmptyValidator]}
            validateAsTyping={true}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <FormInput
            label="Address Line 2"
            name="address.address_line_2"
            validators={[]}
            validateAsTyping={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="City"
            name="address.city"
            validators={[notEmptyValidator]}
            validateAsTyping={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="State"
            name="address.state"
            validators={[notEmptyValidator]}
            validateAsTyping={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="Country"
            name="address.country"
            validators={[notEmptyValidator]}
            validateAsTyping={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="Zip Code"
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
    </Box>
  );
}

export default Step3;
