import env from "./env";
import tokensExpiration from "./tokens";

const config = {
  ...env,
  ...tokensExpiration,
};

export default config;
