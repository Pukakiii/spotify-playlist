console.log("Main function running...");
const accessToken = main();

async function main() {
  const clientId = process.env.REACT_APP_API_KEY;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  console.log("Code from URL:", code);
  if (!code) {
    // We're starting fresh — generate verifier and redirect

    redirectToAuthCodeFlow(clientId);
  } else {
    // We're coming back from Spotify — use existing verifier
    const accessToken = await getAccessToken(clientId, code);

    if (!accessToken) {
      localStorage.removeItem("verifier"); // clear just in case
      window.location.href = "/"; // restart
      return;
    }
    console.log("Access token:", accessToken);

    return accessToken;
  }
}

async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  localStorage.setItem("verifier", verifier);
  console.log("Generated verifier:", verifier);

  const challenge = await generateCodeChallenge(verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://127.0.0.1:3000/callback");
  params.append(
    "scope",
    "user-read-private user-read-email playlist-modify-private playlist-modify-public"
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  console.log("Generated verifier:", text);
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");
  console.log("Retrieved verifier:", verifier);
  console.log("Code from URL:", code);
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://127.0.0.1:3000/callback");
  params.append("code_verifier", verifier);

  console.log("Requesting access token with params:", params.toString());

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await result.json();

  return data.access_token;
}

// searchRequest
export async function searchRequest(query) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track,artist,album`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("Search request response:", response);
    const data = await response.json();
    // console.log("Search request data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

async function fetchProfile() {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await accessToken}`,
    },
  });
  const data = await result.json();
  console.log("Profile id:", data.id);
  return data.id;
}
const profileId = fetchProfile();

// createPlaylist
export async function createPlaylist(playlistName) {
  const result = await fetch(
    `https://api.spotify.com/v1/users/${await profileId}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playlistName,
      }),
    }
  );
  const data = await result.json();
  console.log("Create playlist response:", result);
  console.log("Created playlist ID:", data.id);
  return data.id;
}

export async function addTracksToPlaylist(
  tracks,
  playlistId = createPlaylist()
) {
  console.log("Adding tracks to playlist...");
  console.log("Tracks to add:", tracks);
  const tracksUris = tracks
    .filter((track) => track.added)
    .map((track) => `spotify:track:${track.id}`);
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${await playlistId}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: tracksUris,
      }),
    }
  );
  const data = await result.json();
  console.log("Add tracks response:", data);
  return data;
}

// CLIENT AUTH FLOW
// export async function tokenRequest() {
//   console.log("Requesting token...");
//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,
//   });
//   const data = await response.json();
//   return data.access_token;
// }

// const token = await tokenRequest();
