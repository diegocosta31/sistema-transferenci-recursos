import "./Navbar.css";

// Components
import { NavLink } from "react-router-dom";


// Hooks
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../slices/authSlice";

const Navbar = () => {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  

  return (
    <nav id="nav">      
      <h2>Conta Parceira</h2> 
      
      <ul id="nav-links">
        {auth ? (
          <>                       
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
