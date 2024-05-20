import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import { MantineProvider, createTheme, virtualColor } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: "primary",
      dark: "teal",
      light: "teal",
    }),
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
)
