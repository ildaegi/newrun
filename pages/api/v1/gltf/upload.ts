import {
  Req,
  Body,
  createHandler,
  Post,
  ValidationPipe,
  UseMiddleware,
} from "@storyofams/next-api-decorators";

import * as M from "../../../../src/src-server/models";
import { ReqGltfFileUpload, ReqTest } from "../../../../src/src-server/dtos";
import type { NextApiRequest } from "next";
import { WithFormDataParser } from "../../../../src/src-server/middlewares";
import { githubFileUpload } from "../../../../src/src-server/services";

export const config = { api: { bodyParser: false } };

class GltfHandler {
  @Post()
  @WithFormDataParser()
  // @Req() req: NextApiRequest
  // @Body(ValidationPipe()) body: ReqTest
  async upload(@Body(ValidationPipe()) body: ReqGltfFileUpload) {
    console.log("[server] : localhost:3000/api/v1/gltf/upload", body);

    const { files, name } = body;
    if (!files || !name) {
      return;
    }
    const file: any = files[0];
    const uploadFiles = await githubFileUpload({ name, path: file.path });

    // const uploadFiles = await M.gltf.create({
    //   name,
    //   file: files,
    //   configId: "test",
    // });

    console.log({ uploadFiles });

    return [] as const;
  }
}

export default createHandler(GltfHandler);
