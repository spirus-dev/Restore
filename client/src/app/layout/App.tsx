import { useEffect, useState } from "react";
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    fetch("https://localhost:7022/api/products")
    .then(response => response.json())
    .then(data => setProducts(data))
  }, []);

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <NavBar darkMode={darkMode} toogleDarkMode={toggleDarkMode}/>
      <Box
        sx={{
          background: darkMode ? 'radial-gradient(circle, #1e3aBa, #111B27)' : 'radial-gradient(circle, #baecf9, #f0f9ff)',
          color: 'text.primary',
          minHeight: '100vh',
          py: 6
        }}
      >
        <Container maxWidth="xl" sx={{mt: 8}}>
          <Catalog products={products}/>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
