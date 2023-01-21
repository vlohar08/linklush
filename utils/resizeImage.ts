import Resizer from "react-image-file-resizer";

const resizeFile = (file: File): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      100,
      100,
      "WEBP",
      100,
      0,
      (uri) => {
        resolve(uri as File);
      },
      "file"
    );
  });

export default resizeFile;
