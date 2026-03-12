"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();


sessionStorage.setItem("token", data.token);

const usersRes = await fetch("https://fakestoreapi.com/users");
const users = await usersRes.json();

const user = users.find((u: any) => u.username === username);

sessionStorage.setItem("userId", user.id);

router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              required
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <style jsx>{`
        * { box-sizing: border-box; }

        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f4f4f4;
          font-family: Arial, sans-serif;
        }

        .login-card {
          background: #fff;
          padding: 30px 25px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          width: 100%;
          max-width: 340px;
        }

        .login-title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          margin-bottom: 5px;
          color: #555;
        }

        .form-group input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 14px;
          outline: none;
        }

        .error {
          color: red;
          font-size: 13px;
          margin-bottom: 8px;
        }

        button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background-color: #7b5cff;
          color: #fff;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
        }

        button:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}