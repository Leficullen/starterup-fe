
    //define API URL
    export const API_URL =
      "https://develop-hackathon-api.224668.xyz/hackathon/v1";

    //define function GET
    export async function GET(path: string) {
      const token = localStorage.getItem("authToken");

      const url = `${API_URL}${path}`;
      console.log("GET URL:", url);
      console.log("TOKEN SENT:", token);

      return fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }



    export async function POST(path: string, body: any) {
      const url = `${API_URL}${path}`;
      console.log("POST URL:", url);

      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    }
