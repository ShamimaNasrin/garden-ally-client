import envConfig from "@/config/envConfig";

const UploadImgToImgBB = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const imgBBKey = envConfig.imgbbKey;

  const url = `https://api.imgbb.com/1/upload?key=${imgBBKey}`;

  const imgBBResponse = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if (!imgBBResponse.ok) {
    throw new Error("Fail to upload Image To ImgBB!");
  }

  const imgData = await imgBBResponse.json();
  return imgData.data.url;
};

export default UploadImgToImgBB;
