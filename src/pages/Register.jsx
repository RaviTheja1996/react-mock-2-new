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
import { register } from "../Redux/action.js";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = () => {
    dispatch(register({ username, avatar, email, password })).then(() => {
      toast({
        title: "You have been registered",
        position: "top",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/login");
    });
  };

  const handleEmailInputChange = (e) => setEmail(e.target.value);
  const handlePasswordInputChange = (e) => setPassword(e.target.value);
  const handleUsernameInputChange = (e) => setUsername(e.target.value);
  const handleAvatarInputChange = (e) => setAvatar(e.target.value);

  const isForumError =
    email === "" && password === "" && avatar === "" && username === "";

  return (
    <FormControl isInvalid={isForumError} mx={"auto"} w={"90%"}>
      <FormLabel>Username</FormLabel>
      <Input
        type="text"
        value={username}
        onChange={handleUsernameInputChange}
      />
      {!isForumError ? (
        <FormHelperText>Enter the username.</FormHelperText>
      ) : (
        <FormErrorMessage>username is required.</FormErrorMessage>
      )}
      <FormLabel>Avatar</FormLabel>
      <Input type="text" value={avatar} onChange={handleAvatarInputChange} />
      {!isForumError ? (
        <FormHelperText>Enter the avatar url.</FormHelperText>
      ) : (
        <FormErrorMessage>avatar is required.</FormErrorMessage>
      )}
      <FormLabel>Email</FormLabel>
      <Input type="email" value={email} onChange={handleEmailInputChange} />
      {!isForumError ? (
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
      {!isForumError ? (
        <FormHelperText>Enter the password.</FormHelperText>
      ) : (
        <FormErrorMessage>Password is required.</FormErrorMessage>
      )}
      <Button onClick={handleSubmit}>Login</Button>
    </FormControl>
  );
};

export default Register;
