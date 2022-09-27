import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { cadastroAPI } from "../../services/api";
import { useHistory } from "react-router-dom";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const history = useHistory();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(
      JSON.parse(localStorage.getItem("@Client:token")) ? true : false
    );
  }, []);

  const registerClient = (clientData) => {
    cadastroAPI
      .post("clients", clientData)
      .then((resp) => {
        resp.data.forEach((item) => {
          localStorage.setItem("@Client:userID", JSON.stringify(item.id));
        });
        toast.success("Registered with success!", {
          theme: "dark",
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
        history.push("/");
      })
      .catch((error) => {
        toast.error("Couldn't register!", {
          theme: "dark",
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const loginClient = (loginData) => {
    cadastroAPI
      .post("login", loginData)
      .then((resp) => {
        localStorage.setItem("@Client:token", JSON.stringify(resp.data.token));
        setIsLogged(true);
        toast.success("Login successful!", {
          theme: "dark",
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          theme: "dark",
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
        setIsLogged(false);
      });
  };

  return (
    <SessionContext.Provider
      value={{
        isLogged,
        setIsLogged,
        registerClient,
        loginClient,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
