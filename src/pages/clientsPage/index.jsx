import { useSession } from "../../providers/session";
import { useClient } from "../../providers/clients";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ClientsPage = () => {
  const token = JSON.parse(localStorage.getItem("@Client:token")) || undefined;
  const userId =
    JSON.parse(localStorage.getItem("@Client:userID")) || undefined;

  const history = useHistory();
  const { isLogged, setIsLogged } = useSession();
  const {
    clientData,
    clientsList,
    clientDetails,
    createClient,
    listAllClients,
    retrieveClient,
    updateClient,
    deleteClient,
  } = useClient();

  useEffect(() => {
    if (isLogged === false) history.push("/");
  }, [isLogged]);

  useEffect(() => {
    retrieveClient(userId);
  }, []);

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.clear();
  };

  return (
    <main>
      <h1>CLIENTS PAGE</h1>
      {!!clientDetails &&
        clientDetails.map((item, index) => (
          <h1 key={index}>Welcome, {item.name}</h1>
        ))}
      <section></section>
      <button onClick={() => handleLogout()}></button>
    </main>
  );
};
export default ClientsPage;
