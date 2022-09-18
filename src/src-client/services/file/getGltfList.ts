export async function getGltfList() {
  try {
    const res = await fetch("api/v1/gltf");
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
