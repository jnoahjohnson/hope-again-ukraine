import { generateKey } from "~/utils/cloudinaryUpload.server";

export function loader({ request }: { request: Request }) {
  let headers: Headers = request.headers;
  let timestamp = headers.get("timestamp");
  let upload_preset = headers.get("upload_preset");

  let signature = generateKey({
    timestamp: timestamp ?? "",
    upload_preset: upload_preset ?? "",
  });

  return { signature };
}
