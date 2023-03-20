import RepairsTable from "./features/client-crud/components/ClientList";
import Container from "@mui/material/Container";

import { InsertClientDialog } from "./features/client-crud/components/insertClientDialog";
import { RepairListContextProvider } from "./features/client-crud/components/ClientList/context";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import DialogRequestOutCome from "./features/client-crud/components/contextDialog/UI/dialogRequestOutCome";


const theme: Theme = createTheme({
  typography: {
    subtitle1: { color: '#5e5e60' },
    subtitle2: { color: '#5e5e60' },
    h2: { color: 'green' },
    h3: { color: 'blue' },
  }
});



function App() {
  return (
    <div className="App">

      <ThemeProvider theme={theme}>

        <Container sx={{ mt: 4 }}>
          <RepairListContextProvider />
        </Container>

      </ThemeProvider>
    </div>
  );
}

export default App;
