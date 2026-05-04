import { headers } from "next/headers";
import { auth } from "../../lib/auth";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
      headers: await headers(),
    });

    return Response.json({ data: result, success: true });
  } catch (error) {
    return Response.json(
      { error: String(error), success: false },
      { status: 400 },
    );
  }
}
