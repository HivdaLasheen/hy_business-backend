const endpoints = {
  index: {
    base: "/",
    ping: "/ping",
  },
  status: {
    base: "/status",
  },
  auth: {
    login: "/auth/login",
    adminLogin: "/auth/admin/login",
    applicantSignup: "/auth/signup/applicant",
    organizationSignup: "/auth/signup/organization",
    logout: "/auth/logout",
    verifyEmail: "/auth/verify-email",
    passwordRequest: "/auth/password-request",
    passwordReset: "/auth/password-reset",
  },
  api: {
    applicant: {
      education: {
        base: "/api/applicant/:id/education",
        certificate: "/api/applicant/:id/education/certificate",
      },
      language: {
        base: "/api/applicant/:id/language",
        delete: "/api/applicant/:id/language/:langId",
        updateLevel: "/api/applicant/:id/language/:langId/level",
        certificate: "/api/applicant/:id/language/certificate",
      },
      workExperience: {
        base: "/api/applicant/:id/experience",
        cv: "/api/applicant/:id/experience/cv",
        certificate: "/api/applicant/:id/experience/certificate",
      },
      prevWorkExperience: {
        base: "/api/applicant/:id/experience/previous",
        one: "/api/applicant/:id/experience/previous/:expId",
      },
      jobPreferences: {
        base: "/api/applicant/:id/job-preferences",
      },
    },
  },
};

export default endpoints;
