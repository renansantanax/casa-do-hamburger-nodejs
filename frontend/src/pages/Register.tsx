import { Link } from "react-router";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!name || !email || !password || !cep) {
        alert("Todos os campos são obrigatórios");
        setError("Todos os campos são obrigatórios");
        return;
      }

      if (password !== confirmPassword) {
        setError("As senhas não coincidem");
        return;
      }

      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, cep }),
      });

      switch (response.status) {
        case 409:
          setError("Email já cadastrado");
          break;
        case 400:
          setError("Todos os campos são obrigatórios");
          break;
        case 500:
          setError("Erro interno do servidor");
          break;
        case 201:
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setCep("");
          setError("");
          break;
        default:
          setError("");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Erro ao registrar:", error);
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
        <Input
          placeholder="Nome"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <Input
          placeholder="Email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <Input
          placeholder="Confirme sua senha"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <Input
          placeholder="CEP"
          type="text"
          onChange={(e) => setCep(e.target.value)}
          value={cep}
        />
        <p className="text-left text-red-500">{error}</p>
        <div className="mt-3 flex w-full flex-col gap-2">
          <Button title="Criar conta" type="submit" />
          <Link to="/login" className="w-full">
            <Button title="Já tenho uma conta" variant="outline" />
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
