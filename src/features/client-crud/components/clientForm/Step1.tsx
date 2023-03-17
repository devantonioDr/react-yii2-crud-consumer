import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import {
    FormInput
} from "../UI/FormInput";

import { StepperBackAndForth } from "../UI/StepperBackAndForth";
import { notEmptyValidator } from "../../utils/formValidators";

function Step1() {
  
    return (
      <Box sx={{ marginRight: "20px", mt: 2 }}>
          <Grid container columns={12} spacing={2}>
            <Grid item sm={6} xs={12}>
              <FormInput
                label="Email"
                name="email"
                validators={[notEmptyValidator]}
                validateAsTyping={true}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormInput
                label="Phone"
                name="phone"
                validators={[notEmptyValidator]}
                validateAsTyping={true}
              />
            </Grid>
          </Grid>
          <StepperBackAndForth satisfy={["phone","email"]} />
       
      </Box>
    );
}

export default Step1;
