import { useEffect, useState } from "react";
import api from "../api";
import type { ConfigResponse } from "../types";

export function useConfig() {
  const [config, setConfig] = useState<ConfigResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get<ConfigResponse>("/api/config/")
      .then((resp) => {
        if (!mounted) return;
        setConfig(resp.data);
        setError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.response?.data?.detail || "Failed to load config");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { config, loading, error };
}
