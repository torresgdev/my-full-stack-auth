import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; 
import DashboardPage from './pages/Dashboard';
import ShoppingList from './components/ui/ShoppingList'; // 

function App() {
  return (
    <Router>
      
      <AuthProvider> 
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/shopping-list" element={<ShoppingList />} /> 

         
          <Route path="/" element={<LoginPage />} /> 
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;