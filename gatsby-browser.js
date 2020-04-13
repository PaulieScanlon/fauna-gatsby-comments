const React = require("react");

const { AppContextProvider } = require("./src/components/AppContext");
const { Identity } = require("./src/components/Identity");

exports.wrapRootElement = ({ element }) => (
  <AppContextProvider>
    <Identity>{element}</Identity>
  </AppContextProvider>
);
