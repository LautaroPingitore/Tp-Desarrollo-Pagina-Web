import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './features/layout/Layout';
import Home from './features/home/Home';
import AlojamientoDetail from './features/alojamientoDetail/AlojamientoDetail';

const theme = createTheme({
  pallete: {
    primary: {
      main: '#1976d2',
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>

      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout></Layout>} />
            <Route path="/about" element={<Home/>} />
            <Route path="/alojamientos/:id" element={<AlojamientoDetail />} />
          </Routes>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
