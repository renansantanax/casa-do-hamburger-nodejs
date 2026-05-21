import { Link } from "react-router";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setError("Email e senha são obrigatórios");
        return;
      }

      const response: Response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.status === 400) {
        setError("Email e senha são obrigatórios");
        return;
      }

      if (response.status === 401) {
        setError("Email ou senha incorretos");
        return;
      }

      if (response.status === 404) {
        setError("Usuário não encontrado");
        return;
      }

      if (response.status === 200) {
        setError("");
        const json = await response.json();
        navigate("/");
        setUser(json);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return;
    }
  };

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center gap-2">
        <Link to="/">
          <img className="mx-auto mb-4" src="./logo.png" alt="" />
        </Link>
        <div className="mb-3 flex flex-col gap-2">
          {" "}
          <Input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
          />
          <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p className="text-left text-sm text-red-500">{error}</p>
        </div>
        <Button title="Fazer login" type="submit" />
        <Link to="/register" className="w-full">
          <Button title="Não tem uma conta" variant="outline" />
        </Link>
      </div>
    </form>
  );
};

export default Login;
