export async function userSession(req) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/session",
    {
      method: "GET",
      headers: {
        cookie: req.headers.cookie,
      },
    }
  );
  const session = await response.json();

  return session;
}

export function hasSession(session) {
  return JSON.stringify(session) !== '{}'
}
