import * as Notion from "../helpers/notion";

export default Notion.notionModelCreate({
  title: "gltf",
  databaseId: "f39a0d16b549423aaabc72462bdd2d17",
  field: {
    name: "title",
    file: "files",
    configId: "rich_text",
  },
});
