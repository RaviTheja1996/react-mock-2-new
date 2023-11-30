import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/action.js";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailInputChange = (e) => setEmail(e.target.value);
  const handlePasswordInputChange = (e) => setPassword(e.target.value);

  const isEmailError = email === "" && password === "";

  const handleSubmit = () => {
    dispatch(login({ email, password }))
      .then(() => {
        alert("login successful");
        navigate("/forum");
      })
      .catch(() => {
        alert("login failed");
      });
  };

  return (
    <FormControl isInvalid={isEmailError} mx={"auto"} w={"90%"}>
      <FormLabel>Email</FormLabel>
      <Input type="email" value={email} onChange={handleEmailInputChange} />
      {!isEmailError ? (
        <FormHelperText>Enter the registered Email.</FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
      <FormLabel>Password</FormLabel>
      <Input
        type="password"
        value={password}
        onChange={handlePasswordInputChange}
      />
      {!isEmailError ? (
        <FormHelperText>Enter the password.</FormHelperText>
      ) : (
        <FormErrorMessage>Password is required.</FormErrorMessage>
      )}
      <Button onClick={handleSubmit}>Login</Button>
    </FormControl>
  );
};

export default Login;
