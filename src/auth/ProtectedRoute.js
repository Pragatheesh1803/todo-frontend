import { Navigate } from "react-router-dom";
import { isTokenExpired } from "./auth";

function ProtectedRoute({children}) {
    if(isTokenExpired()) {
        return <Navigate to="/userlogin" replace />
    }
    return children
}
export default ProtectedRoute