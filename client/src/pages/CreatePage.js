import React, { useContext, useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
  const { push } = useHistory();
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");
  const pressHandler = async (event) => {
    if ((event.key = "Enter")) {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${token}` }
        );
        push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <TextField
        margin="normal"
        fullWidth
        id="link"
        label="Ссылка"
        name="link"
        value={link}
        autoFocus
        onChange={(e) => setLink(e.target.value)}
        onKeyPress={pressHandler}
      />
    </Container>
  );
};
