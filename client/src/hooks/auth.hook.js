import { useState, useCallback, useEffect } from "react";

export const useAuth = () => {
  const storageName = "userData";
  const [ready, setReady] = useState(null);
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId);
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
