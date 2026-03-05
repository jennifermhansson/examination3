import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export default function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [apiResponse, setApiResponse] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  async function callApi() {
  try {
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    });
        setToken(accessToken); 

    const url = `${import.meta.env.VITE_API_BASE}/users/protected`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const contentType = res.headers.get("content-type") ?? "";
    const text = await res.text();

    if (!res.ok) {
      setApiResponse(`HTTP ${res.status}\n${text}`);
      return;
    }

    // bara parse JSON om det faktiskt är JSON
    if (contentType.includes("application/json")) {
      setApiResponse(JSON.stringify(JSON.parse(text), null, 2));
    } else {
      setApiResponse(text);
    }
  } catch (err) {
    console.error(err);
    setApiResponse("API call failed");
  }
}

  if (isLoading) return <p>Loading...</p>;

  function decodeJwt(token: string) {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
}

  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px" }}>
      <h1>Auth0 - examinationsprojekt </h1>

      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>
          Logga in
        </button>
      )}

      {isAuthenticated && (
        <>
          <p>Inloggad som: {user?.name}</p>

          <button onClick={callApi}>
            Hämta Token
          </button>

          <button
            onClick={() =>
              logout({
                logoutParams: { returnTo: window.location.origin },
              })
            }
          >
            Logga ut
          </button>

           {token && (
  <pre>{JSON.stringify(decodeJwt(token), null, 2)}</pre>
)} 
          {token && (
  <>
    <h3>Access Token</h3>
    <textarea
      value={token}
      readOnly
      style={{
        width: "100%",
        height: "120px",
        fontFamily: "monospace",
        fontSize: "12px",
      }}
    />
  </>
)}
        </>
      )}
    </div>
  );
}