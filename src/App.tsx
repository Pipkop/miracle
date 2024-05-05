import { Page, Navbar } from "konsta/react";
import { BrowserRouter } from "react-router-dom";
import { SDKProvider, DisplayGate } from "@tma.js/sdk-react";
import { ThemeProvider } from "./Theme";
import { BaseRoutes } from "./Routes";
import "./App.css";

const SDKProviderError = () => (
  <Page>
    <Navbar title="Error" />
  </Page>
);
const SDKProviderLoading = () => (
  <Page>
    <Navbar title="Loading" />
  </Page>
);
const SDKInitialState = () => (
  <Page>
    <Navbar title="Intialize" />
  </Page>
);

function App() {
  return (
    <SDKProvider>
      <DisplayGate
        error={SDKProviderError}
        loading={SDKProviderLoading}
        initial={SDKInitialState}
      >
        <BrowserRouter basename="/miracle">
          <ThemeProvider>
            <BaseRoutes />
          </ThemeProvider>
        </BrowserRouter>
      </DisplayGate>
    </SDKProvider>
  );
}

export default App;
