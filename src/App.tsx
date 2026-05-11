import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import MemberDashboard from './pages/MemberDashboard';
import Reports from './pages/Reports';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Route */}
        <Route path='/' element={<Login />} />

        {/* Admin Route */}
        <Route path='/admin' element={ <ProtectedRoute role='admin'><AdminDashboard /></ProtectedRoute> }/>

        {/* Member Route */}
        <Route path='/member' element={<ProtectedRoute role='member'><MemberDashboard /></ProtectedRoute> } />

        {/* Reports Route */}
        <Route path='/reports' element={<ProtectedRoute role='admin'><Reports /></ProtectedRoute>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;