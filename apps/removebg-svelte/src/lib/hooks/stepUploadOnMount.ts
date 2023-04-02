import { onMount } from "svelte";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import { img } from "../stores/imageStore";
import { Cloudinary } from "@cloudinary/url-gen";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";
import { CLOUDNAME, API_KEY, UPLOAD_PRESET } from "../consts";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: CLOUDNAME,
  },
  url: {
    secure: true,
  },
});

export const stepUploadOnMount = () => {
  onMount(() => {
    const dropzone = new Dropzone("#dropzone", {
      uploadMultiple: false,
      acceptedFiles: ".jpg,.png,.webp",
      maxFiles: 1,
      clickable: "#upload-button",
      url: `https://api.cloudinary.com/v1_1/${API_KEY}/image/upload`,
    });

    dropzone.on("sending", (file, xhr, formData) => {
      img.setStatusUploading();
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("timestamp", Date.now() / 1000);
      formData.append("api_key", API_KEY);
    });

    dropzone.on("success", (file, res) => {
      const { secure_url: url, public_id: publicId } = res;
      img.setOriginal(url);
      const imageWithoutBackground = cloudinary
        .image(publicId)
        .effect(backgroundRemoval());
      img.setStatusDone();
      img.setModified(imageWithoutBackground.toURL());
      console.log(imageWithoutBackground.toURL());
    });
    dropzone.on("error", (file, res) => {
      console.log("Todo MAL", res);
    });
  });
};
