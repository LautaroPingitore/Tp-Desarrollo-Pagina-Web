import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './features/layout/Layout';
import Home from './features/home/Home';
import AlojamientoDetail from './components/alojamientoDetail/AlojamientoDetail';
import { AuthProvider } from './context/authContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider> {/* 👈 Contexto que envuelve todo */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/alojamientos/:id" element={<AlojamientoDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
