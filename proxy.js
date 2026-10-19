import { NextResponse } from "next/server";

// Optional password gate for the private preview. Set DEMO_PASSWORD to enable;
// any username works. Leave it unset for local development.
export function proxy(request) {
  const password = process.env.DEMO_PASSWORD;
  if (!password) return NextResponse.next();

  const header = request.headers.get("authorization") || "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded) {
    const decoded = atob(encoded);
    if (decoded.slice(decoded.indexOf(":") + 1) === password) return NextResponse.next();
  }
  return new NextResponse("Private concept preview", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="AIBEN concept preview"' },
  });
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
