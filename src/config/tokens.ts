import ms from "ms";

const tokensExpiration = {
  jwtTokenExp: "1d",
  jwtTokenExpMax: "30d",
  cookieExp: ms("30d"),
};

export default tokensExpiration;
