import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './features/layout/Layout';
import Home from './features/home/Home';
import AlojamientoDetail from './components/alojamientoDetail/AlojamientoDetail';
import MisAlojamientos from './components/misAlojamientos/misAlojamientos';
import Reservas from './components/reservas/reservas';
import Notificaciones from './components/misNotificaciones/misNotificaciones';
import CrearAlojamiento from './components/crearAlojamiento/crearAlojamiento';
import AuthProvider from './context/authContext.jsx'

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
              <Route path="/misAlojamientos/:id" element={<MisAlojamientos />} />
              <Route path="/misReservas/:id" element={<Reservas />} />
              <Route path="/misNotificaciones/:id" element={<Notificaciones />} />
              <Route path="/crearAlojamiento/:id" element={<CrearAlojamiento />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
