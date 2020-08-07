import React, { useContext, useState, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import { LinkCards } from "../components/LinkCards";

export const LinksPage = () => {
  const [links, setLinks] = useState();
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request(`/api/link`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (e) {}
  }, [request, token]);

  useEffect(() => {
    fetchLinks();
  }, []);

  if (loading) {
    return <CircularProgress color={"primary"} size={"200px"} />;
  }
  if (links) {
    return <LinkCards links={links} />;
  }
  return <div />;
};
