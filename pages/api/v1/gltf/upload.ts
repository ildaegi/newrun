import {
  Body,
  createHandler,
  Post,
  ValidationPipe,
} from "@storyofams/next-api-decorators";

import * as M from "../../../../src/src-server/models";
import { ReqGltfFileUpload } from "../../../../src/src-server/dtos";
import { WithFormDataParser } from "../../../../src/src-server/middlewares";
import { githubFileUpload } from "../../../../src/src-server/services";
import { HttpException } from "../../../../src/src-server/exceptions";

export const config = { api: { bodyParser: false } };

class GltfHandler {
  @Post()
  @WithFormDataParser()
  async upload(@Body(ValidationPipe()) body: ReqGltfFileUpload) {
    const { files, name } = body;

    const file: any = files[0];

    try {
      const githubUploadFile = await githubFileUpload({
        name,
        path: file.path,
      });
      const downloadUrl = `https://raw.githubusercontent.com/ildaegi/newrun-upload/main/src/src-client/assets/model/${name}`;
      const notionUploadFile = await M.gltf.create({
        name,
        file: downloadUrl,
        configId: "test",
      });

      return Boolean(githubUploadFile && notionUploadFile);
    } catch (error) {
      throw new HttpException("FILE_UPLOAD_ERROR");
    }
  }
}

export default createHandler(GltfHandler);
