export async function tokenRequest() {
  // console.log("Token request started");
  const key = process.env.REACT_APP_API_KEY;
  const secret = process.env.REACT_APP_API_SECRET;
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`,
  });
  const data = await response.json();
  // console.log("Token request response:", data.access_token);
  return data.access_token;
}

const token = await tokenRequest();

export async function searchRequest(query) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track,artist,album`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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
