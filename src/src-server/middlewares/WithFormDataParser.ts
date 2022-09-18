import {
  createMiddlewareDecorator,
  NextFunction,
} from "@storyofams/next-api-decorators";
import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import { HttpException } from "../exceptions";

export const WithFormDataParser = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    try {
      const form = new multiparty.Form();
      const { fields, files } = await new Promise<{
        fields: Record<string, string[]>;
        files: Record<string, File[]>;
      }>((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
          if (err) reject({ err });

          resolve({ fields, files });
        });
      });

      const _fields = Object.keys(fields).reduce(
        (results, fieldKey) => ({
          ...results,
          [fieldKey]: fields[fieldKey][0],
        }),
        {}
      );

      const body = { ..._fields, ...files };

      req.body = body;

      next();
    } catch (error) {
      console.log(error);
      throw new HttpException("FORM_DATA_PARSER_ERROR");
    }
  }
);
