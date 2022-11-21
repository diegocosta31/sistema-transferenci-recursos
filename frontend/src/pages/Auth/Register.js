import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {      
      username,
      password,
      confirmPassword,
    };

    dispatch(register(user));
    
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
      <h2>Conta Parceira</h2>
      <p className="subtitle">Cadastre-se.</p>
      <form onSubmit={handleSubmit}>
        
        <input
          type="text" required  placeholder="UserName" onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input required type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input required type="password" placeholder="Confirme a senha" onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
