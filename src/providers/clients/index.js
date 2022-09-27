import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { cadastroAPI } from "../../services/api";

const ClientsContext = createContext();

export const ClientsProvider = ({ children }) => {
  const [clientData, setClientData] = useState();
  const [clientsList, setClientsList] = useState();
  const [clientDetails, setClientDetails] = useState();
  const token = JSON.parse(localStorage.getItem("@Client:token")) || undefined;

  const createClient = (data) => {
    cadastroAPI
      .post("clients", data)
      .then((resp) => {
        const newClient = [...clientData, resp.data];
        setClientData(newClient);
        toast.success("Registered with success!", {
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
      });
  };

  const listAllClients = () => {
    cadastroAPI
      .get("clients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setClientsList(resp.data);
      })
      .catch((error) => {
        toast.error(error.message, {
          theme: "dark",
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const retrieveClient = (clientId) => {
    cadastroAPI
      .get(`/clients/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setClientDetails(resp.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, {
          theme: "dark",
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const updateClient = (data, clientId) => {
    cadastroAPI
      .patch(`/clients/${clientId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        toast.success(resp.message, {
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
      });
  };

  const deleteClient = (data, clientId) => {
    cadastroAPI
      .delete(`/clients/${clientId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        toast.success(resp.message, {
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
      });
  };

  return (
    <ClientsContext.Provider
      value={{
        clientData,
        clientsList,
        clientDetails,
        createClient,
        listAllClients,
        retrieveClient,
        updateClient,
        deleteClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};
export const useClient = () => useContext(ClientsContext);
