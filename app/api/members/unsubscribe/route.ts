import { TSGhostAdminAPI } from "@ts-ghost/admin-api";
import { NextRequest } from "next/server";

const adminAPI = new TSGhostAdminAPI(process.env.GHOST_URL, process.env.GHOST_ADMIN_KEY, "v5.0");

export async function POST(request: NextRequest) {
  const reqData = await request.json();

  if (!reqData.email) {
    return new Response("No email provided!", { status: 400 });
  }

  const email = reqData.email;

  const result = await adminAPI.members.add({ email }, { send_email: true, email_type: "subscribe" });
  if (result.success === false) {
    const unifiedErrorMessage = result.errors.flatMap((error) => error.context ?? error.message).join(", ");
    return new Response(unifiedErrorMessage, { status: 400 });
  }

  return new Response("Thanks for signing up!");
}
