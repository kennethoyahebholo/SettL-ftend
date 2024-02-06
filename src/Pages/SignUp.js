import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { styled, css } from "styled-components";
import axios from "axios";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo/favicon.png";
import googleImg from "../assets/images/flat-color-icons_google.svg";
import { userContext } from "../App";
import { useFormik } from "formik";
import { ToastContainer, toast, Slide } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TailSpin as Loader } from "react-loader-spinner";

//container
const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: block;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
  }

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }

  // Extra large screens, TV
  @media only screen and (min-width: 1201px) {
  }
`;

const SharedSideStyles = css`
  height: 100%;
  overflow: auto;
  padding: 2rem;
  box-sizing: border-box;
`;

//Left
const StyledLeft = styled.div`
  ${SharedSideStyles}
  flex: 0.6;
  background-color: #f26600;
  background-image: linear-gradient(#f8701c 0.6px, transparent 0.6px),
    linear-gradient(90deg, #f8701c 0.6px, transparent 0.6px);
  background-size: 130px 130px;
  background-position: 0 0, 0 0;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: none;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
  }
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }
`;

const StyledInnerLeft = styled.div`
  border-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
`;

const StyledInnerText = styled.div`
  background-color: #f8701c;
  height: 20rem;
  width: 15rem;
  padding: 3rem 0 0 1.5rem;
  font-size: 1.7rem;
  letter-spacing: 0.01rem;
  line-height: 2.5rem;
`;

const StyledInnerText2 = styled.div`
  font-size: 0.7rem;
  line-height: 1rem;
  opacity: 0.3;
  font-weight: 100;
  padding: 2rem 1rem 0 0;
`;

//Middle
const StyledMiddle = styled.div`
  flex: 0.5;
  margin-top: 2rem;
  margin-left: 8rem;
  font-weight: 700;
  overflow-y: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 0;
  }

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    margin: 2rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    margin: 2rem;
  }

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    margin: 3rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }

  // Extra large screens, TV
  @media only screen and (min-width: 1201px) {
  }
`;

const StyledLogo = styled(NavLink)`
  color: #f26600;
  font-size: 2rem;
  text-decoration: none;
`;

const StyledImg = styled.img`
  height: 2rem;
`;

const StyledHeader = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 2.5rem;
`;

const StyledSubHead = styled.p`
  letter-spacing: -0.05rem;
  font-size: 0.8rem;
  opacity: 0.5;
  margin-top: 0;
`;

//Form
const StyledForm = styled.form`
  display: block;
  margin-top: 1rem; /* Adjust the margin as needed */
  &:focus {
    margin-top: 18px;
    padding-left: 2px;
  }
`;

const StyledLabel = styled.label`
  font-size: 0.65rem;
  letter-spacing: -0.01rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 3px;
  box-sizing: border-box;
  display: block;
  border-radius: 0.3rem;
  border: 1px solid rgba(223, 140, 82, 0.3);

  &:focus {
    border: 2px solid #ff4500;
  }
`;

const EyeIcon = styled.span`
  cursor: pointer;
  color: gray;
`;

const PasswordContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 3px;
  box-sizing: border-box;
  display: block;
  border-radius: 0.3rem;
  border: 1px solid rgba(223, 140, 82, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    border: 2px solid #ff4500;
  }
`;

const StyledPasswordInput = styled.input`
  width: 95%;
  outline: none;
  border: none;
`;
const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 10px;
  box-sizing: border-box;
  display: block;
  border-radius: 0.3rem;
  border: 1px solid rgba(223, 140, 82, 0.3);
  &:focus {
    margin-top: 0;
    border: 1px solid #ff4500;
  }
`;
const StyledBtn = styled.button`
  padding: 0.6rem 1rem;
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0.2rem;
  background: linear-gradient(to right, #ff4500, #ff8c00, #f26600);
  color: #ffff;
  margin: 1rem 0 0 0;
  &:hover {
    background: #f26600;
  }
`;

const StyledLineCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;
const StyledLine = styled.div`
  width: 5rem;
  height: 2px;
  background: #000000;
  opacity: 0.2;
`;

const StyledLineTxt = styled.p`
  font-size: 0.8rem;
  opacity: 0.5;
  margin: 0 1rem;
  letter-spacing: -0.01rem;
`;

const StyledGoogleBtn = styled.button`
  padding: 0.5rem 0;
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0.2rem;
  margin: 1rem 0 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: gray;
  }
`;

const StyleTermsTxt = styled.p`
  color: #000000;
  font-weight: 100;
  letter-spacing: -0.005rem;
`;

const ErrorMessage = styled.div`
  color: red;
`;

//Right
const StyledRight = styled.div`
  flex: 0.8;
  ${SharedSideStyles}

  // Mobile devices
@media only screen and (min-width: 320px) and (max-width: 480px) {
    display: none;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    display: none;
  }

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    display: none;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    flex: 0.2;
  }

  // Extra large screens, TV
  @media only screen and (min-width: 1201px) {
  }
`;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "Must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
      "Password must contain at least one alphanumeric character and one symbol"
    ),
  role: Yup.string(),
});

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [userData, setUserData] = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  console.log("otp1");

  const login = () => {};

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: SignupSchema, //causin problems so i comment it out
    onSubmit: async (values, actions) => {
      console.log("Formik values:", values);
      console.log("Formik actions:", actions);
      try {
        setLoading(true);
        if (!values.password) {
          toast.error("Password is required");
          return;
        }
        const passwordRegex =
          /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;
        if (!passwordRegex.test(values.password)) {
          toast.error(
            "Password must contain at least one alphanumeric character and one symbol"
          );
          return;
        }

        const response = await axios.post(
          "https://settl-core-dev.onrender.com/api/v1/send-otp",
          {
            email: values.email,
          }
        );

        if (response.status === 200) {
          console.log("otp2");

          setUserData({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            role: values.role,
            password: values.password,
          });

          console.log("Response:", response);
          console.log("otp3");
          console.log("userdata Signup:", userData); //not logging due to asynchroneous nature
          formik.resetForm();

          setLoading(false);
          toast.success(response.data.message);
          navigate("/otp");
        } else {
          setLoading(false);
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Registration failed:", error);
        setLoading(false);
        if (error.response) {
          const { data } = error.response;

          if (data.errors) {
            Object.keys(data.errors).forEach((field) => {
              toast.error(`${field}: ${data.errors[field]}`);
            });
          } else {
            toast.error(data.message);
          }
        } else {
          toast.error("unknown swever error");
        }
      }
    },
    touched: {},
  });

  const { handleSubmit, handleChange, handleBlur, values, touched } = formik;

  return (
    <>
      <StyledContainer>
        <StyledLeft>
          <StyledInnerLeft>
            <StyledInnerText>
              Where
              <br />
              trust meets
              <br />
              seamless <br />
              <span
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(to right, #EAF7FF, #5BC2FF, #8E6CF9)",
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Transactions
              </span>
              <StyledInnerText2>
                We won't have everyone but we guuarantee our clients will have
                the best e-commerce experience
              </StyledInnerText2>
            </StyledInnerText>
          </StyledInnerLeft>
        </StyledLeft>

        <StyledMiddle>
          <StyledLogo to="/">
            <StyledImg src={logo} alt="logo" />
            Sett<span style={{ color: "#4db6ac" }}>L</span>
          </StyledLogo>
          <div>
            <StyledHeader>
              Welcome<span style={{ fontSize: "1.5rem" }}> &#128075;</span>
            </StyledHeader>
            <StyledSubHead>
              Enter information to create an account
            </StyledSubHead>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              transition={Slide}
            />

            <StyledForm
              onSubmit={handleSubmit}
              disabled={formik.isSubmitting}
              ref={inputRef}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <StyledLabel htmlFor="firstName">
                  Fistname
                  <StyledInput
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    placeholder="Enter Firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ width: "95%", marginRight: "1rem" }}
                  />
                </StyledLabel>

                <StyledLabel htmlFor="lastName">
                  Last Name
                  <StyledInput
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    placeholder="Enter Lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ width: "100%" }}
                  />
                </StyledLabel>
              </div>

              <StyledLabel htmlFor="email">
                Email
                <StyledInput
                  type="text"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  placeholder="Enter your e-mail"
                  onChange={handleChange}
                />
              </StyledLabel>

              <StyledLabel htmlFor="password">
                Password
                <PasswordContainer>
                  <StyledPasswordInput
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={passwordVisibility ? "text" : "password"}
                    {...formik.getFieldProps("password")}
                  />
                  <EyeIcon onClick={togglePasswordVisibility}>
                    {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
                  </EyeIcon>
                </PasswordContainer>
              </StyledLabel>
              <StyledLabel htmlFor="confirmPassword">
                Confirm Password
                <StyledInput
                  type={passwordVisibility ? "text" : "password"}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </StyledLabel>
              <StyledLabel htmlFor="role">
                Role
                <StyledSelect
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                >
                  <option value="select" disabled>
                    Select...
                  </option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </StyledSelect>
              </StyledLabel>
              {touched.password && formErrors.password && (
                <ErrorMessage>{formErrors.password}</ErrorMessage>
              )}
              {loading && (
                <Loader
                  type="TailSpin"
                  color="#ff4500"
                  height={20}
                  width={20}
                  style={{ margin: "auto" }}
                />
              )}
              <StyledBtn type="submit" disabled={formik.isSubmitting}>
                {loading ? "Signing up..." : "Sign Up"}
              </StyledBtn>
            </StyledForm>
          </div>
          <StyledLineCont>
            <StyledLine></StyledLine>
            <StyledLineTxt>or</StyledLineTxt>
            <StyledLine></StyledLine>
          </StyledLineCont>
          <StyledGoogleBtn type="button" onClick={login}>
            <img
              src={googleImg}
              alt="googleImg"
              style={{ paddingRight: "0.5rem" }}
            />
            Sign in with Google
          </StyledGoogleBtn>
          <div>
            <StyledLineTxt style={{ marginLeft: "0" }}>
              Already have an account? <NavLink to="/login"> Sign In</NavLink>
            </StyledLineTxt>
            <StyleTermsTxt style={{ marginLeft: "0", fontSize: "0.55rem" }}>
              By creating an account you agree with our span{" "}
              <Link to="/terms-and-conditions">Terms of Service</Link>,
              <Link to="/privacy-policy">Privacy Policy </Link>, and our default
              Notification Settings.
            </StyleTermsTxt>
          </div>
        </StyledMiddle>
        <StyledRight></StyledRight>
      </StyledContainer>
    </>
  );
};

export default React.memo(Signup);
