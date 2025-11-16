
//define API URL
export const API_URL = "https://develop-hackathon-api.224668.xyz/hackathon/v1";

//define function GET
export async function GET(path: string) {
    //define token yang udh didapat dari local storage yahahaaha
    const token = localStorage.getItem(
        "authToken"
    );

    //nge-fetch cuyyy
    return fetch(`${API_URL}${path}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
}


export async function POST(path: string, body: any) {
    const token = localStorage.getItem(
        "authToken"
    );

    return fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}

// saya butuh function patch
export async function PATCH(path: string, body: any) {
    const token = localStorage.getItem(
        "authToken"
    );

    const headers: any = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const init: any = {
        method: "PATCH",
        headers,
    };

    // ngikut sj
    if (body instanceof FormData) {
        delete headers["Content-Type"];
        init.body = body;
    } else {
        init.body = JSON.stringify(body);
    }

    return fetch(`${API_URL}${path}`, init);
}

