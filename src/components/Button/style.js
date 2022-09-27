import styled, { css } from "styled-components";

const Colors = (props) => {
  return props === "--primary-gradient"
    ? "var(--primary-gradient)"
    : props === "--grey-1"
    ? "var(--grey-1)"
    : props === "--negative"
    ? "var(--negative)"
    : props === "--grey-3" && "var(--grey-3)";
};

export const StyledButton = styled.button`
  background: ${(props) => Colors(props.colorSchema)};

  color: var(--grey-4);

  width: 250px;
  height: 35px;

  border: none;
  border-radius: 5px;

  font-weight: 600;
  font-size: 15px;
  font-family: Nunito;

  transition: 0.5s;

  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.5);

  ${(props) =>
    props.colorSchema === "--primary-gradient" &&
    css`
      &:hover {
        transform: scale(1.05);
      }
    `};

  ${(props) =>
    props.colorSchema === "--grey-1" &&
    css`
      &:hover {
        background: #343b41;
      }
    `};

  ${(props) =>
    props.colorSchema === "--primary-negative" &&
    css`
      &:hover {
        background: #868e96;
      }
    `};
`;
