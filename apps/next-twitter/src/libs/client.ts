import axios from "axios";
import { getSession, useSession } from "next-auth/react";

const BASE_URL = "http://localhost:3001";

export const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const clientAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
