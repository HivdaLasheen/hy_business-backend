import { Request, Response } from "express";
import prisma from "../../prisma";
import config from "../../config";
import fs from "fs";
import HttpStatusCodes from "../../config/httpStatusCodes";
import singleFileUpload from "../../file-upload/singleFile.upload";
