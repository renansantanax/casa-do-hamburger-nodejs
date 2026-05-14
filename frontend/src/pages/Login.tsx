import { Link } from "react-router";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Link to="/">
          <img className="mb-4" src="./logo.png" alt="" />
        </Link>
        <Input
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button title="Fazer login" />
        <Link to="/register" className="w-full">
          <Button title="Não tem uma conta" variant="outline" />
        </Link>
      </div>
    </form>
  );
};

export default Login;
