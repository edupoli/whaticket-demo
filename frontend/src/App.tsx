import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import LanguageSelector from "./components/LanguageSelector";
import { createTheme, ThemeProvider, PaletteType } from "@material-ui/core"; 
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import { withTranslation, WithTranslation } from "react-i18next";
import Routes from "./routes";

const queryClient = new QueryClient();

interface AppProps extends WithTranslation {}

const App: React.FC<AppProps> = ({ t }) => {
  const [locale, setLocale] = useState<string | undefined>(undefined); 
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const preferredTheme = window.localStorage.getItem("preferredTheme");
  const [mode, setMode] = useState<PaletteType>(
    (preferredTheme as PaletteType) || (prefersDarkMode ? "dark" : "light") 
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light") as PaletteType); 
      },
    }),
    []
  );

  const theme = React.useMemo(() => {
    return createTheme(
      {
        scrollbarStyles: {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
            backgroundColor: "#0000FF",
          },
        },
        scrollbarStylesSoft: {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: mode === "light" ? "#F3F3F3" : "#333333",
          },
        },
        palette: {
          //@ts-ignore
          type: mode,
          primary: { main: "#0000FF" },
          textPrimary: mode === "light" ? "#0000FF" : "#FFFFFF",
          borderPrimary: mode === "light" ? "#0000FF" : "#FFFFFF",
          dark: { main: mode === "light" ? "#333333" : "#666" },
          light: { main: mode === "light" ? "#F3F3F3" : "#333333" },
          tabHeaderBackground: mode === "light" ? "#EEE" : "#666",
          optionsBackground: mode === "light" ? "#fafafa" : "#333",
          options: mode === "light" ? "#fafafa" : "#666",
          fontecor: mode === "light" ? "#0000FF" : "#fff",
          fancyBackground: mode === "light" ? "#fafafa" : "#333",
          bordabox: mode === "light" ? "#eee" : "#333",
          newmessagebox: mode === "light" ? "#eee" : "#333",
          inputdigita: mode === "light" ? "#fff" : "#666",
          contactdrawer: mode === "light" ? "#fff" : "#666",
          announcements: mode === "light" ? "#ededed" : "#333",
          login: mode === "light" ? "#fff" : "#1C1C1C",
          announcementspopover: mode === "light" ? "#fff" : "#666",
          chatlist: mode === "light" ? "#eee" : "#666",
          boxlist: mode === "light" ? "#ededed" : "#666",
          boxchatlist: mode === "light" ? "#ededed" : "#333",
          total: mode === "light" ? "#fff" : "#222",
          messageIcons: mode === "light" ? "grey" : "#F3F3F3",
          inputBackground: mode === "light" ? "#FFFFFF" : "#333",
          barraSuperior:
            mode === "light"
              ? "linear-gradient(to right, #0000FF, #0000CD, #0000BB)"
              : "#666",
          boxticket: mode === "light" ? "#EEE" : "#666",
          campaigntab: mode === "light" ? "#ededed" : "#666",
        },
        mode,
      },
      locale
    );
  }, [mode, locale]);

  useEffect(() => {
    window.localStorage.setItem("preferredTheme", mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ colorMode }}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <LanguageSelector />
          <Routes />
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default withTranslation()(App);
