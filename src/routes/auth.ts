import { Router } from "express";
import * as v from "../validation/validation";
import auth from "../middlewares/auth.middleware";
import validateRequest from "../middlewares/validateRequest.middleware";
import { login, adminLogin } from "../controllers/auth/login.controller";
import { logout } from "../controllers/auth/logout.controller";
import {
  organizationSignup,
  applicantSignup,
  verifyAccount,
} from "../controllers/auth/signup.controller";
import {
  passwordReset,
  requestPasswordReset,
} from "../controllers/auth/passwordReset.controller";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication related endpoints
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: securePassword
 *               role:
 *                 type: string
 *                 example: applicant
 *               rememberMe:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
 router.post("/login", v.loginValidation, login);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     tags: [Auth]
 *     summary: Admin login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: secureAdminPassword
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/admin/login", v.adminLoginValidation, adminLogin);

/**
 * @swagger
 * /auth/signup/applicant:
 *   post:
 *     tags: [Auth]
 *     summary: Applicant signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: applicant@example.com
 *               password:
 *                 type: string
 *                 example: applicantSecurePassword
 *               confirmPassword:
 *                 type: string
 *                 example: applicantSecurePassword
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               middleName:
 *                 type: string
 *                 example: Michael
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: male
 *               country:
 *                 type: string
 *                 example: Egypt
 *               city:
 *                 type: string
 *                 example: Cairo
 *     responses:
 *       201:
 *         description: Applicant signed up successfully
 *       400:
 *         description: Bad Request
 */
 router.post("/signup/applicant", v.applicantSignUpValidators, applicantSignup);

/**
 * @swagger
 * /auth/signup/organization:
 *   post:
 *     tags: [Auth]
 *     summary: Organization signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: organization@example.com
 *               password:
 *                 type: string
 *                 example: organizationSecurePassword
 *               confirmPassword:
 *                 type: string
 *                 example: organizationSecurePassword
 *               name:
 *                 type: string
 *                 example: Example Organization
 *               type:
 *                 type: string
 *                 example: Non-Profit
 *               linkedin:
 *                 type: string
 *                 example: https://www.linkedin.com/company/example-organization
 *               isVirtual:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Organization signed up successfully
 *       400:
 *         description: Bad Request
 */
 router.post(
  "/signup/organization",
  v.organizationSignUpValidators,
  organizationSignup
);


/**
 * @swagger
 * /verify-email:
 *   get:
 *     tags: [Auth]
 *     summary: Verify email address
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: verificationToken
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid token
 */
router.get("/verify-email", v.verificationValidator, verifyAccount);

/**
 * @swagger
 * /password/request:
 *   post:
 *     tags: [Auth]
 *     summary: Request password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset request successful
 *       404:
 *         description: User not found
 */
router.post(
  "/password/request",
  v.requestPasswordResetValidators,
  validateRequest,
  requestPasswordReset
);

/**
 * @swagger
 * /password/reset:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: resetToken
 *               newPassword:
 *                 type: string
 *                 example: newSecurePassword
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid token or password
 */
router.post(
  "/password/reset",
  v.resetPasswordValidators,
  validateRequest,
  passwordReset
);

/**
 * @swagger
 * /logout:
 *   delete:
 *     tags: [Auth]
 *     summary: User logout
 *     responses:
 *       204:
 *         description: User logged out successfully
 */
router.delete("/logout", logout);

export default router;
