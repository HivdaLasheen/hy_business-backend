import path from "path";

const paths = {
  index: path.resolve(__dirname, "../../"),
  src: path.resolve(__dirname, "../"),
  sql: path.resolve(__dirname, "../../sql"),
  storage: {
    index: path.resolve(__dirname, "../../storage"),
    certificate: path.resolve(__dirname, "../../storage/certificate"),
    education: path.resolve(__dirname, "../../storage/education"),
    language: path.resolve(__dirname, "../../storage/language"),
    resume: path.resolve(__dirname, "../../storage/resume"),
    logo: path.resolve(__dirname, "../../storage/logo"),
  },
};

export default paths;
