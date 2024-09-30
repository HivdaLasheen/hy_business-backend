import ms from "ms";

const tokensExpiration = {
  jwt: {
    tokenExp: "1d",
    tokenExpMax: "30d",
  },
  cookie: {
    expTime: ms("1d"),
    expTimeMax: ms("30d"),
  },
};

export default tokensExpiration;
