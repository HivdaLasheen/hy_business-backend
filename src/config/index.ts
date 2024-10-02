import env from "./env";
import paths from "./paths";
import tokensExpiration from "./tokens";

const config = {
  ...env,
  ...tokensExpiration,
  paths,
};

export default config;
