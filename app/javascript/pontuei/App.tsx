import { createTheme, ThemeProvider } from "@mui/material";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "store";
import AppRoutes from "routes";

import { primary } from "theme/colors";
import { globalStyles } from "theme/global";
import Toast from "features/notification/Toast";

const theme = createTheme({
  palette: {
    mode: "light",
    primary,
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <PersistGate loading={null} persistor={persistor}>
        {globalStyles}
        {/* @ts-ignore */}
        <ThemeProvider theme={theme}>
          <AppRoutes />
          <Toast />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
