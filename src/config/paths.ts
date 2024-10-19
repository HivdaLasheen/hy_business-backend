import path from "path";

const paths = {
  index: path.resolve(__dirname, "../../"),
  src: path.resolve(__dirname, "../"),
  sql: path.resolve(__dirname, "../../sql"),
  storage: {
    index: path.resolve(__dirname, "../../storage"),
    workCertificate: path.resolve(__dirname, "../../storage/work-certificate"),
    education: path.resolve(__dirname, "../../storage/education"),
    language: path.resolve(__dirname, "../../storage/language"),
    cv: path.resolve(__dirname, "../../storage/resume"),
    logo: path.resolve(__dirname, "../../storage/logo"),
    pfp: path.resolve(__dirname, "../../storage/pfp"),
    default: {
      index: path.resolve(__dirname, "../../storage/default"),
      logo: path.resolve(__dirname, "../../storage/default/logo.png"),
      pfp: path.resolve(__dirname, "../../storage/default/pfp.jpg"),
    },
  },
  ssl: {
    key: "",
    cert: "",
  },
};

export default paths;
