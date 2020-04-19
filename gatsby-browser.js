const React = require("react");
const { client } = require("./src/client");

const { AppContextProvider } = require("./src/components/AppContext");
const { Identity } = require("./src/components/Identity");
const { ApolloProvider } = require("@apollo/react-hooks");

exports.wrapRootElement = ({ element }) => (
  <AppContextProvider>
    <Identity>
      <ApolloProvider client={client}>{element}</ApolloProvider>
    </Identity>
  </AppContextProvider>
);
