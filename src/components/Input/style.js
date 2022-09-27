import styled from "styled-components";

export const StyledInput = styled.input`
  padding: 5px 10px 5px 10px;

  width: 100%;

  border: none;
  border-radius: 8px;

  outline: none;

  transition: transform 0.5s;

  :focus {
    outline: 2px solid var(--primary);
  }
`;

export const StyledLabel = styled.label`
  color: #ffffff;

  transition: 0.5s;
`;

export const Container = styled.div`
  width: 80%;

  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  height: 60px;

  margin-top: 15px;

  span {
    color: var(--primary);

    font-size: 0.9rem;
  }

  :hover {
    input {
      transform: scale(1.05);
    }

    label {
      transform: translateX(15px);

      color: var(--primary);
    }
  }
`;
