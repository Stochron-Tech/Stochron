import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import api from "../api";

type Props = {
  onLoggedIn: () => void;
};

export default function Login({ onLoggedIn }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await api.post("/api/login/", { username, password });
      setMessage("Login successful");
      onLoggedIn();
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Invalid credentials";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm p-6 bg-card border-border">
        <h2 className="text-primary mb-4">Sign in</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="text-sm text-muted-foreground">Username</label>
            <input
              id="username"
              type="text"
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-muted-foreground">Password</label>
            <input
              id="password"
              type="password"
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        {message && (
          <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">{message}</p>
        )}
      </Card>
    </div>
  );
}
