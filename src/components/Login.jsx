import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [terms, setTerms] = useState(false);

  const emailRegex = /^\S+@\S+\.\S+$/;
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  const isEmailValid = emailRegex.test(email);
  const isPassValid = passRegex.test(pass);

  const errors = [];

  if (email && !isEmailValid) errors.push("Geçerli bir email giriniz");
  if (pass && !isPassValid) errors.push("Şifre en az 6 karakter olmalı ve sayı içermeli");
  if (!terms && (email || pass)) errors.push("Şartları kabul etmeniz gerekiyor");

  const canSubmit = isEmailValid && isPassValid && terms;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) {
      navigate("/success");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
        />
        şartları kabul ediyorum
      </label>

      {errors.map((err, i) => (
        <p key={i} style={{ color: "red", fontSize: "14px" }}>{err}</p>
      ))}

      <button type="submit" disabled={!canSubmit}>
        Login
      </button>
    </form>
  );
}
