chrome.runtime.onMessage.addListener(notify);
async function getBlob(url) {
  let response = await fetch(url);
  let data = await response.blob()
  return data;
}

async function notify(message) {
  let urlArr = message["urls"];
  let title = message["title"] ? message["title"] : 'unsee';
  if (urlArr.length < 1) {
    return
  }
  let zip = new JSZip();
  for (url of urlArr) {
    let imgData = await getBlob(url);
    zip.file(`${url.split("id=")[1].split("&size=big")[0]}.jpg`, imgData)
  }
  zip.generateAsync({
    type: "blob"
  }).then(function (content) {
    saveAs(content, `${title}.zip`);
  });
}