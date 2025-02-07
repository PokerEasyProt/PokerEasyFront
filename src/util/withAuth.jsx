import { Navigate, Outlet } from "react-router-dom";

const WithAuth = () => {
  const isAuthenticated = document.cookie.includes("token="); // Verifica se o usuário está autenticado

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default WithAuth;
