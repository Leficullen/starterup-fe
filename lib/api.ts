import { ok } from "assert";
import { METHODS } from "http";

//define API URL
export const API_URL = "https://develop-hackathon-api.224668.xyz/hackathon/v1";

//define function GET
export async function GET(path: string) {
    //define token yang udh didapat dari local storage yahahaaha
    const token = localStorage.getItem("authToken");

    //nge-fetch cuyyy
    return fetch(`${API_URL}${path}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
}

export async function POST(path: string, body: any) {
    const token = localStorage.getItem("authToken");

    return fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
}

// INI FUNCTION USER LOGIN (AUTHENTICATION )
export async function userLogin({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const json = await res.json().catch(() => null);

        if (res.ok && json && json.token) {
            localStorage.setItem("authToken", json.token);
        }

        return {
            ok: res.ok,
            status: res.status,
            user: json?.user,
            message: json?.message || "Login failed",
        } as any;
    } catch (error) {
        console.error("Login fetch error:", error);
        return { ok: false, status: 0, message: "Network error" };
    }
}

// INI FUNCTION UNTUK ALREADY AUTHENTICATED USER (DUMMY ACC)

export function getMe() {
    // MOCKED UP USER DATA
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    let mockUser;

    if (path.startsWith("/collector")) {
        mockUser = {
            id: "mock-collector-id",
            email: "collector@example.com",
            name: "Arif",
            role: "collector",
        };
    } else if (path.startsWith("/processor")) {
        mockUser = {
            id: "mock-processor-id",
            email: "processor@example.com",
            name: "IndoShrimp Plant",
            role: "processor",
        };
    } else if (path.startsWith("/exporter")) {
        mockUser = {
            id: "mock-exporter-id",
            email: "exporter@example.com",
            name: "IndoShrimp Plant",
            role: "exporter",
        };
    } else {
        mockUser = {
            id: "mock-farmer-id",
            email: "farmer@example.com",
            name: "Pak Hasan",
            role: "farmer",
        };
    }

    return Promise.resolve(mockUser);
}

// MOCKED UP BATCH DATA JUST FOR DEMONSTRATION
let mockBatches: any[] = [];

function loadMockBatches() {
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("mockBatches");
        if (stored) {
            mockBatches = JSON.parse(stored);
        }
    }
}

function saveMockBatches() {
    if (typeof window !== "undefined") {
        localStorage.setItem("mockBatches", JSON.stringify(mockBatches));
    }
}

export async function createBatch({
    qr_code,
    catch_time,
    metadata,
}: {
    qr_code: string;
    catch_time: string;
    metadata: { species: string; pond_id: string };
}) {
    loadMockBatches();
    const newBatch = {
        id: `batch-${Date.now()}`,
        qr_code,
        catch_time,
        metadata,
        created_at: new Date().toISOString(),
    };
    mockBatches.push(newBatch);
    saveMockBatches();

    // EVENT TERAKHIR
    loadMockBatchHistory();
    if (!mockBatchHistory[newBatch.id]) {
        mockBatchHistory[newBatch.id] = [];
    }
    mockBatchHistory[newBatch.id].push({
        actor_role: "farmer",
        action: "Harvested",
        actor_id: "Farmer {name}",
        created_at: new Date().toISOString(),
    });
    saveMockBatchHistory();

    return { ok: true, batch: newBatch, message: "Batch created successfully" };
}

// FUNCTION UNTUK MENGAMBIL BATCH BY ID
export async function getBatches({
    farmer_id,
    page = 1,
    per_page = 10,
}: {
    farmer_id?: string;
    page?: number;
    per_page?: number;
} = {}) {
    loadMockBatches();
    const filteredBatches = farmer_id ? mockBatches : mockBatches;
    return { ok: true, data: filteredBatches };
}

export async function getBatch(id: string) {
    loadMockBatches();
    const batch = mockBatches.find((b) => b.id === id || b.qr_code === id);
    return { ok: !!batch, data: batch };
}

// MOCKED UP BATCH HISTORY
let mockBatchHistory: { [key: string]: any[] } = {};

function loadMockBatchHistory() {
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("mockBatchHistory");
        if (stored) {
            mockBatchHistory = JSON.parse(stored);
        }
    }
}

function saveMockBatchHistory() {
    if (typeof window !== "undefined") {
        localStorage.setItem("mockBatchHistory", JSON.stringify(mockBatchHistory));
    }
}

export async function getBatchHistory(id: string) {
    loadMockBatchHistory();
    const history = mockBatchHistory[id] || [];
    return { ok: true, events: history };
}

export async function addBatchHistory(
    id: string,
    action: string,
    actor_role: string,
    actor_id: string
) {
    loadMockBatchHistory();
    if (!mockBatchHistory[id]) {
        mockBatchHistory[id] = [];
    }
    mockBatchHistory[id].push({
        actor_role,
        action,
        actor_id,
        created_at: new Date().toISOString(),
    });
    saveMockBatchHistory();
    return { ok: true };
}
