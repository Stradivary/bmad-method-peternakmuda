import { NextResponse } from "next/server";
import gallery from "@/data/gallery.json";

function sanitizeQuery(q: string | string[] | undefined | null) {
    if (!q) return "";
    const val = Array.isArray(q) ? q[0] : q;
    return (val || "").trim().slice(0, 200);
}

export async function GET(request: Request) {
    try {
        const url = request ? new URL(request.url) : new URL("http://localhost/api/gallery");
        const page = Math.max(1, Number(url.searchParams.get("page") || "1"));
        const limitRaw = Number(url.searchParams.get("limit") || "12");
        const limit = Math.min(50, Math.max(1, isNaN(limitRaw) ? 12 : limitRaw));
        const q = sanitizeQuery(url.searchParams.get("q"));

        let items = Array.isArray(gallery) ? gallery.slice() : [];

        if (q) {
            const qLower = q.toLowerCase();
            items = items.filter((it: any) =>
                (it.title || "").toLowerCase().includes(qLower) ||
                (it.description || "").toLowerCase().includes(qLower)
            );
        }

        const start = (page - 1) * limit;
        const paged = items.slice(start, start + limit);

        return NextResponse.json(paged);
    } catch (err: any) {
        return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
    }
}