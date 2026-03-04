/**
 * API proxy to forward requests to backend server
 * This allows the frontend to call /api/* which gets proxied to http://localhost:3001/api/*
 */

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ proxy: string[] }> },
) {
  const { proxy } = await params;
  const path = proxy.join("/");
  const url = `${BACKEND_URL}/${path}`;

  try {
    const body = await request.json().catch(() => null);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    return Response.json({ error: "Backend request failed" }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ proxy: string[] }> },
) {
  const { proxy } = await params;
  const path = proxy.join("/");
  const url = `${BACKEND_URL}/${path}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    return Response.json({ error: "Backend request failed" }, { status: 500 });
  }
}
