import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Codth from "../../pic/codth-logo.png";
import "./LoginPage.css";

import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import loginService from "services/loginService";

const validationSchema = yup.object({
  username: yup.string().required("Please enter a valid user."),
  password: yup.string().required("Password cannot be empty."),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (buttonLoading) return;
      setButtonLoading(true);
      setErrorMessage("");

      try {
        const response = await loginService(values);
        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem("token", token);

          setTimeout(() => {
            setIsLoading(true);
          }, 600);

          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        console.error("Login failed:", error);
        const msg =
          error.response?.data?.message ||
          "Invalid credentials. Please try again.";
        setErrorMessage(msg);
      } finally {
        setButtonLoading(false);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    );
  }

  return (
    <Container
      className="login-page-container"
      maxWidth={false}
      disableGutters
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ padding: "0px 8px", width: "597px", maxWidth: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              padding: "24px 0px",
              background: "#F5F5F5",
              boxShadow: "0px 4px 12px 0px #0000001A",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: "6.4px",
            }}
          >
            <Box
              sx={{
                padding: "24px 48px 24px 48px",
                borderTopLeftRadius: "6.4px",
                borderTopRightRadius: "6.4px",
              }}
            >
              <Box sx={{ paddingBottom: "24px", maxHeight: "120px" }}>
                <img
                  src={Codth}
                  alt="Company Logo"
                  style={{ width: "93px", height: "96px" }}
                />
              </Box>

              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Calibri",
                  fontWeight: 700,
                  fontSize: "32px",
                  color: "#000000",
                  textAlign: "center",
                  lineHeight: "normal",

                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  textAlign: "center",
                }}
              >
                Login to your account
              </Typography>
              {errorMessage && (
                <Typography
                  sx={{
                    color: "#B41E38",
                    fontFamily: "Calibri",
                    fontSize: "14px",
                    marginTop: "10px",
                    fontWeight: "700",
                    textAlign: "center",
                    backgroundColor: "#F5F5F5",

                    "& .css-1rap3rs-MuiFormControl-root-MuiTextField-root .MuiFormHelperText-root.Mui-error":
                      {
                        margin: "0",
                        paddingTop: "3px",
                        paddingRight: "14px",
                        backgroundColor: "#F5F5F5",
                      },
                  }}
                >
                  {errorMessage}
                </Typography>
              )}
            </Box>

            <Box sx={{ padding: "24px 48px 24px 48px", gap: "16px" }}>
              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
                >
                  <TextField
                    sx={{
                      padding: "0px",
                      margin: "0px",
                      borderRadius: "8px",
                      backgroundColor: "#f5f5f5",
                      color: "#EDEDED",

                      "& .MuiOutlinedInput-root": {
                        height: "60px",
                        border: "1px solid #EDEDED",

                        backgroundColor: "#FFFFFF",
                        color: "#EDEDED",
                        borderRadius: "8px",
                        padding: 0,
                        marginRight: 0,
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#05595B",
                          borderWidth: "1.5px",
                        },
                      "& .MuiOutlinedInput-input": {
                        padding: "14px",
                        height: "60px",
                        boxSizing: "border-box",
                        marginRight: 0,
                        fontFamily: "Calibri",
                        fontWeight: 400,
                        fontSize: "18px",
                        color: "#666666",

                        paddingRight: "30px !important",
                      },
                      "& .MuiFormHelperText-root.Mui-error": {
                        color: "#B41E38",
                        fontFamily: "Calibri",
                        fontSize: "14px",
                        marginLeft: "0px",
                        fontWeight: "400",
                        paddingLeft: "16px",
                      },
                      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#B41E38",
                        },
                      "& .MuiOutlinedInput-root.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#B41E38",
                        },

                      "& .MuiInputAdornment-root": {
                        position: "absolute",
                        left: "52px",
                        marginLeft: 0,
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        pointerEvents: "none",
                      },
                    }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="User"
                    autoComplete="new-password"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    InputProps={{
                      endAdornment: !formik.values.username ? (
                        <InputAdornment position="end">
                          <span style={{ color: "red", fontSize: "18px" }}>
                            *
                          </span>
                        </InputAdornment>
                      ) : null,
                    }}
                  />

                  <TextField
                    sx={{
                      padding: "0px",
                      margin: "0px",
                      borderRadius: "8px",
                      backgroundColor: "#f5f5f5",
                      color: "#EDEDED",

                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#FFFFFF",
                        color: "#EDEDED",
                        height: "60px",
                        borderRadius: "8px",
                        border: "1px solid  #EDEDED",
                        padding: 0,
                        marginRight: 0,
                      },

                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#05595B",
                          borderWidth: "1.5px",
                        },

                      "& .MuiOutlinedInput-input": {
                        padding: "14px",
                        height: "60px",
                        boxSizing: "border-box",
                        marginRight: 0,
                        fontFamily: "Calibri",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontSize: "18px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "#666666",
                      },
                      "& .MuiFormHelperText-root.Mui-error": {
                        color: "#B41E38",
                        fontFamily: "Calibri",
                        fontSize: "14px",
                        marginLeft: "0px",
                        fontWight: "400",

                        paddingLeft: "16px",
                      },

                      "& .MuiInputAdornment-root": {
                        position: "absolute",
                        left: "88px",
                        width: "80%",
                        marginLeft: 0,
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                      },

                      "& .css-18ublwx-MuiButtonBase-root-MuiIconButton-root": {
                        position: "absolute",
                        right: "2%",
                      },

                      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#B41E38",
                        },
                      "& .MuiOutlinedInput-root.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#B41E38",
                        },
                    }}
                    fullWidth
                    margin="normal"
                    placeholder="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          {!formik.values.password && (
                            <span
                              style={{
                                color: "red",
                                fontSize: "18px",
                                marginRight: "6px",
                              }}
                            >
                              *
                            </span>
                          )}

                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ color: "#BEBEBF" }}
                          >
                            {showPassword ? (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M22 12.0004C20.2531 15.5766 15.8775 19.0002 11.9998 19.0002C8.12201 19.0002 3.74646 15.5766 2 12"
                                  stroke="#666666"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M22 12.0002C20.2531 8.42398 15.8782 5 12.0005 5C8.1227 5 3.74646 8.42314 2 11.9998"
                                  stroke="#666666"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                  stroke="#666666"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M22 12.0004C20.2531 15.5766 15.8775 19.0002 11.9998 19.0002C8.12201 19.0002 3.74646 15.5766 2 12"
                                  stroke="#666666"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M22 12.0002C20.2531 8.42398 15.8782 5 12.0005 5C8.1227 5 3.74646 8.42314 2 11.9998"
                                  stroke="#666666"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                  stroke="#666666"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box sx={{ paddingTop: "40px" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      paddingRight: "16px",
                      paddingLeft: "16px",
                      color: "#FFFFFF",
                      backgroundColor: "#086E71",
                      gap: "8px",
                      borderRadius: "4px",
                      lineHeight: "normal",
                      fontFamily: "Calibri",
                      height: "52px",
                      fontWeight: "700",
                      fontSize: "18px",
                      textTransform: "none",

                      "&:hover": {
                        backgroundColor: "#05595B",
                        boxShadow: "none",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "#034243",
                        color: "#FFFFFF",
                      },
                    }}
                    type="submit"
                    disabled={buttonLoading || isLoading}
                  >
                    {buttonLoading ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span className="btn-loader"></span>
                        Login...
                      </Box>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
