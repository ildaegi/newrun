export function arrayBufferToString(
  buffer: string | ArrayBuffer,
  callback: (result: string | ArrayBuffer) => void
) {
  const blob = new Blob([buffer], { type: "text/plain" });
  const reader = new FileReader();
  reader.onload = function (evt) {
    evt.target?.result && callback(evt.target.result);
  };
  reader.readAsText(blob, "utf-8");
}
