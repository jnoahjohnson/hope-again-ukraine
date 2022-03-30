var cloudinary = require("cloudinary").v2;

export function generateKey(params_to_sign: {
  timestamp?: string;
  upload_preset?: string;
}) {
  const key = cloudinary.utils.api_sign_request(
    params_to_sign,
    process.env.CLOUDINARY_KEY
  );

  return key;
}
