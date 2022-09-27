import { StyledInput, StyledLabel, Container } from "./style";

const Input = ({ type, description, placeholder, register, name }) => {
  return (
    <Container>
      <StyledLabel>{description}</StyledLabel>
      <StyledInput type={type} placeholder={placeholder} {...register(name)} />
    </Container>
  );
};

export default Input;
