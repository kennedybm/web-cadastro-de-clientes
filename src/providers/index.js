import { SessionProvider } from "./session";
import { ClientsProvider } from "./clients";

const Providers = ({ children }) => {
  return (
    <>
      <SessionProvider>
        <ClientsProvider>{children}</ClientsProvider>
      </SessionProvider>
    </>
  );
};
export default Providers;
