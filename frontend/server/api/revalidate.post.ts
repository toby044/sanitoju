import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

export default defineEventHandler(async (event) => {
  const secret = useRuntimeConfig().sanityWebhookSecret;
  if (!secret) {
    throw createError({ statusCode: 500, message: "Webhook secret not configured" });
  }

  const body = await readRawBody(event);
  const signature = getHeader(event, SIGNATURE_HEADER_NAME);

  if (!signature || !body) {
    throw createError({ statusCode: 400, message: "Missing signature or body" });
  }

  const isValid = await isValidSignature(body, signature, secret);
  if (!isValid) {
    throw createError({ statusCode: 401, message: "Invalid signature" });
  }

  await useStorage("cache").clear();

  return { revalidated: true };
});
