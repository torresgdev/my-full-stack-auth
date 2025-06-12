import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; 
import DashboardPage from './pages/Dashboard';
import ShoppingList from './components/ui/ShoppingList'; // <--- Verifique o caminho real do ShoppingList aqui

function App() {
  return (
    <Router>
      {/* O AuthProvider DEVE ENVOLVER todas as suas rotas que precisam de autenticação */}
      <AuthProvider> 
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Se o ShoppingList for renderizado diretamente por uma rota (menos comum) */}
          <Route path="/shopping-list-page" element={<ShoppingList />} /> 

          {/* Rota padrão para redirecionar para login ou dashboard se já autenticado */}
          <Route path="/" element={<LoginPage />} /> 
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;