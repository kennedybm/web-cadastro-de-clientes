import { useForm } from "react-hook-form";
import { useDidUpdate } from "rooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSession } from "../../providers/session";
import { StyledForm, FormTitle, CheckboxContainer, ErrorBox } from "./style";
import Input from "../Input";
import Button from "../Button";

const Form = ({ name }) => {
  const history = useHistory();
  const { isLogged, setIsLogged, registerClient, loginClient } = useSession();

  const registerSchema = yup.object().shape({
    name: yup
      .string()
      .required("Required field!")
      .min(4, "Minimun 4 characters!")
      .max(50, "Maximun 50 characters!"),
    email: yup.string().required("Required field!").email("Email not valid!"),
    password: yup
      .string()
      .required("Required field!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!"
      ),
    mobileNumber: yup
      .string()
      .required("Required Filed!")
      .max(11, "Maximun 11 characters")
      .matches(
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
        "(xx) xxxxx-xxxx"
      ),
    registerDate: yup.string().required("Required Field!"),
  });

  const loginSchema = yup.object().shape({
    email: yup.string().required("Required field!").email("Email not valid!"),
    password: yup
      .string()
      .required("Required field!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      name.toLowerCase() === "register" ? registerSchema : loginSchema
    ),
  });

  const handleRegister = (data) => {
    registerClient(data);
  };
  const handleLogin = (data) => {
    loginClient(data);
  };

  useDidUpdate(() => {
    if (isLogged) history.push("/clients");
  }, [isLogged]);

  switch (name.toLowerCase()) {
    case "login":
      return (
        <>
          <ToastContainer />
          <StyledForm onSubmit={handleSubmit(handleLogin)}>
            <FormTitle>{name}</FormTitle>
            {!!errors.email && <span>{errors.email.message}</span>}
            <Input
              type="text"
              description="Email:"
              placeholder="Type your email here"
              name="email"
              register={register}
            />
            {!!errors.password && <span>{errors.password.message}</span>}
            <Input
              type="password"
              description="Password:"
              placeholder="Type your password here"
              name="password"
              register={register}
            />
            <section>
              <span>Don't have an account yet?</span>
              <Link to="/register">Click here</Link>
            </section>
            <Button colorSchema="--primary-gradient">Login</Button>
          </StyledForm>
        </>
      );

    case "register":
      return (
        <StyledForm onSubmit={handleSubmit(handleRegister)}>
          <FormTitle>{name}</FormTitle>
          <Input
            type="text"
            description="Username"
            placeholder="Type your username here"
            name="name"
            register={register}
          />
          <ErrorBox>
            {!!errors.name && <span>{errors.name.message}</span>}
          </ErrorBox>
          <Input
            type="text"
            description="Email"
            placeholder="Type your email here"
            name="email"
            register={register}
          />
          <ErrorBox>
            {!!errors.email && <span>{errors.email.message}</span>}
          </ErrorBox>
          <Input
            type="password"
            description="Password"
            placeholder="Type your password here"
            name="password"
            register={register}
          />
          <ErrorBox>
            {!!errors.password && <span>{errors.password.message}</span>}
          </ErrorBox>
          <Input
            type="tel"
            description="Phone number"
            placeholder="Enter your phone number"
            name="mobileNumber"
            register={register}
          />
          <ErrorBox>
            {!!errors.mobileNumber && (
              <span>{errors.mobileNumber.message}</span>
            )}
          </ErrorBox>
          <Input
            type="date"
            description="Register Date"
            placeholder="Date"
            name="registerDate"
            register={register}
          />
          <ErrorBox>
            {!!errors.registerDate && (
              <span>{errors.registerDate.message}</span>
            )}
          </ErrorBox>
          <CheckboxContainer>
            <input type="checkbox" />
            <p>I agree to company terms and conditions</p>
          </CheckboxContainer>
          <Button type="submit" colorSchema="--primary-gradient">
            Register
          </Button>
          <section>
            <span>Already have an account?</span>
            <Link to="/">Click here</Link>
          </section>
        </StyledForm>
      );

    default:
      return null;
  }
};
export default Form;
