import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/gest/Login';
import ProtectedRoute from './tools/protectRoute';
import Dashobard from './components/auth/admin/dashobard';
import ProtectedLogin from './tools/protectLoginPage';

function App() {
  return (
    <div className="App">
<Routes>
  <Route path='/login' element={
    <ProtectedLogin>
      <Login/>
    </ProtectedLogin>
  }/>
  <Route path='/dashboard' element={
  <ProtectedRoute><Dashobard/></ProtectedRoute>
  }/>
</Routes>
    </div>
  );
}

export default App;
