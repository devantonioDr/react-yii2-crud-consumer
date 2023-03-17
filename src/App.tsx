import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { InsertRepairContextProvider } from "./features/client-crud/context/InsertRepairContextProvider";
import { RepairListContextProvider } from "./features/client-crud/components/repairsList/context";

import RepairsTable from "./features/client-crud";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { DialogToggler } from "./features/client-crud/components/contextDialog/UI/dialogToggler";
import { DialogContextProvider } from "./features/client-crud/components/contextDialog/context/dialogContextProvider";
import { DialogComponent } from "./features/client-crud/components/contextDialog/UI/dialogComponent";
import { InsertClientDialog } from "./features/client-crud/components/insertClientDialog";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}


      <InsertClientDialog />




    </div>
  );
}

export default App;
