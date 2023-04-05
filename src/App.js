import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/gest/Login';
import ProtectedRoute from './tools/protectRoute';
import Dashobard from './components/auth/admin/dashobard';

function App() {
  return (
    <div className="App">
<Routes>
  <Route path='/login' Component={Login}/>
  <Route path='/dashboard' element={

  <ProtectedRoute><Dashobard/></ProtectedRoute>
  }/>
</Routes>
    </div>
  );
}

export default App;
