import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistor, store } from "./config/redux/store";
import { createStandaloneToast } from "@chakra-ui/toast";
import AppRouter from "./config/routes/AppRouter";
import { registerLicense } from "@syncfusion/ej2-base";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "@fontsource/source-sans-pro";
import "@fontsource/source-sans-pro/400.css";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NHaF1cW2hIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZiW39dcHBQRWNbU0J3XQ=="
);

const { ToastContainer } = createStandaloneToast();

const fonts = {
  heading: `'Poppins', sans-serif`,
  body: `'Poppins', sans-serif`,
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: localStorage.getItem("systemColorMode") || false,
};

const theme = extendTheme({
  fonts,
  config,
  colors: {
    action: {
      50: "red",
      100: "#f2f9b4",
      200: "#eef588",
      300: "#ecf25a",
      400: "#daee2e",
      500: "#b4d416",
      600: "#82a50d",
      700: "#547607",
      800: "#2c4701",
      900: "#0d1900",
    },
    dark: {
      500: "#000000",
      600: "#000000",
    },
  },
  components: {},
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

const App = () => {
  return (
    <GoogleOAuthProvider clientId="704683649227-p7ql5hcb2299r4gv40glg77s1bi8p6m2.apps.googleusercontent.com">
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <AppRouter />
              <ToastContainer />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
