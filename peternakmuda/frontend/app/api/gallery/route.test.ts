/**
 * @jest-environment node
 */

// Mock NextResponse supaya tidak membutuhkan Fetch API asli (Request/Response)
jest.mock("next/server", () => ({
	NextResponse: {
		json: (data: any) => ({
			status: 200,
			headers: {
				get: (key: string) =>
					key.toLowerCase() === "content-type"
						? "application/json; charset=utf-8"
						: null
			},
			json: async () => data
		})
	}
}));

// Mock data gallery agar stabil
jest.mock("@/data/gallery.json", () => [
	{
		id: 1,
		title: "Peternak Ayam",
		image: "/gallery/peternak-ayam.jpg",
		description: "Aktivitas peternak muda di kandang ayam modern."
	},
	{
		id: 2,
		title: "Peternak Sapi",
		image: "/gallery/peternak-sapi.jpg",
		description: "Pemeliharaan sapi dengan manajemen hijauan."
	}
]);

import { GET } from "./route";

describe("GET /api/gallery (happy path)", () => {
	it("returns 200 and JSON content type", async () => {
		const res = await GET();
		expect(res.status).toBe(200);
		expect(res.headers.get("content-type")).toMatch(/application\/json/i);
	});

	it("returns an array with required fields", async () => {
		const res = await GET();
		const data = await res.json();

		expect(Array.isArray(data)).toBe(true);
		expect(data.length).toBeGreaterThan(0);

		for (const item of data) {
			expect(item).toEqual(
				expect.objectContaining({
					id: expect.any(Number),
					title: expect.any(String),
					image: expect.any(String),
					description: expect.any(String)
				})
			);
		}
	});
});