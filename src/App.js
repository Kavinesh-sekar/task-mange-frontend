import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Component/SignUp';
import LoginPage from './Pages/LoginPage';
import ProtectedRoute from './Component/ProtectedRoute';
import DashBoardPage from './Pages/DashBoardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashBoardPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
