
//define API URL
export const API_URL = "https://develop-hackathon-api.224668.xyz/hackathon/v1";

//define function GET
export async function GET (path:string) {
    //define token yang udh didapat dari local storage yahahaaha
    const token = localStorage.getItem(
      "authToken"
    );

    //nge-fetch cuyyy
    return fetch(`${API_URL}${path}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
    });
}


export async function POST(path:string, body:any) {
    const token = localStorage.getItem(
      "authToken"
    );
    
    return fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    });
}

