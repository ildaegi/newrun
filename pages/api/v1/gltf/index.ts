import { createHandler, Get } from "@storyofams/next-api-decorators";

import * as M from "../../../../src/src-server/models";

class GltfHandler {
  @Get()
  async list() {
    const gltfRes = M.gltf.get();

    return gltfRes;
  }
}
export default createHandler(GltfHandler);
