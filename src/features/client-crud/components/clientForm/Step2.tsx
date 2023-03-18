import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { FormInput, FormInputSelect } from "../UI/FormInput";

import { StepperBackAndForth } from "../UI/StepperBackAndForth";
import { notEmptyValidator } from "../../utils/formValidators";

function Step2() {
  return (
    <Box sx={{ marginRight: "20px", mt: 2 }}>
      <Grid container columns={12} spacing={2}>

        <Grid item sm={6} xs={12}>
          <FormInputSelect
            label="Género"
            name="perfil.gender"
            validators={[notEmptyValidator]}
            options={[
              {
                desc: "Masculino",
                value: "Male"
              },
              {
                desc: "Femenino",
                value: "Female"
              }
            ]}
            validateAsTyping={true}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            label="Descripción"
            name="perfil.description"
            validateAsTyping={true}
          />
        </Grid>
      </Grid>
      <StepperBackAndForth
        satisfy={[
          // "perfil.first_name",
          // "perfil.last_name",
          // "perfil.date_of_birth",
          "perfil.gender",
          "perfil.description",
        ]}
      />
    </Box>
  );
}

export default Step2;
