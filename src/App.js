import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import './App.css';
import CustomerRoutes from './Routers/CustomerRoutes';
import AdminPannel from './Admin/AdminPannel';
import ProtectedRoute from './ProtectedRoute'; 
import NotFound from './Pages/Notfound';

function App() {


  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPannel />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
