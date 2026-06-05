import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { ProgressProvider } from './hooks/useProgress';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import Inicio from './views/Inicio';
import Unidades from './views/Unidades';
import TemaDetalle from './views/TemaDetalle';
import Calculadoras from './views/Calculadoras';
import Quizzes from './views/Quizzes';
import Ajustes from './views/Ajustes';

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<PageTransition />}>
                <Route index element={<Inicio />} />
                <Route path="unidades" element={<Unidades />} />
                <Route path="unidades/:unidadId/:temaId" element={<TemaDetalle />} />
                <Route path="calculadoras" element={<Calculadoras />} />
                <Route path="quizzes" element={<Quizzes />} />
                <Route path="ajustes" element={<Ajustes />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </ThemeProvider>
  );
}
