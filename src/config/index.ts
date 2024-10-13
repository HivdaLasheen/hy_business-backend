import env from "./env";
import paths from "./paths";
import endpoints from "./endpoints";
import tokensExpiration from "./tokens";

const config = {
  ...env,
  ...tokensExpiration,
  paths,
  endpoints,
};

export default config;
