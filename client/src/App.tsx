import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';

export default function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const [token, setToken] = useState<string | null>(null);

  async function callApi() {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
      setToken(accessToken);

      const url = `${import.meta.env.VITE_API_BASE}/users/me`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email,
          name: user?.name ?? user?.nickname,
        }),
      });

      if (!res.ok) {
        console.error('Failed to sync profile', await res.text());
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (isAuthenticated && user) callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (isLoading) return <p>Loading...</p>;

  function decodeJwt(token: string) {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px' }}>
      <h1>Auth0 - examinationsprojekt </h1>

      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Logga in</button>
      )}

      {isAuthenticated && (
        <>
          <p>Inloggad som: {user?.name}</p>

          <button onClick={callApi}>Hämta Token</button>

          <button
            onClick={() =>
              logout({
                logoutParams: { returnTo: window.location.origin },
              })
            }
          >
            Logga ut
          </button>

          {token && <pre>{JSON.stringify(decodeJwt(token), null, 2)}</pre>}
          {token && (
            <>
              <h3>Access Token</h3>
              <textarea
                value={token}
                readOnly
                style={{
                  width: '100%',
                  height: '120px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
