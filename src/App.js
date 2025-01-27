import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Component/SignUp';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
