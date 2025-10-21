import { render, screen, waitFor } from "@testing-library/react";
import Gallery from "../Gallery";

jest.mock("framer-motion", () => ({
	motion: {
		img: (props: any) => <img {...props} />,
	},
}));

beforeEach(() => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			json: () =>
				Promise.resolve([
					{
						id: 1,
						title: "Peternak Ayam",
						image: "/ayam.jpg",
						description: "Peternak ayam sukses di desa",
					},
					{
						id: 2,
						title: "Peternak Sapi",
						image: "/sapi.jpg",
						description: "Peternak sapi inspiratif",
					},
				]),
		})
	) as jest.Mock;
});

afterEach(() => {
	jest.clearAllMocks();
});

describe("Gallery Component", () => {
	it("renders gallery data from API", async () => {
		render(<Gallery />);

		await waitFor(() =>
			expect(screen.queryByText(/memuat galeri/i)).not.toBeInTheDocument()
		);

		const ayamHeading = await screen.findByRole("heading", {
			name: /peternak ayam/i,
		});
		const sapiHeading = await screen.findByRole("heading", {
			name: /peternak sapi/i,
		});

		expect(ayamHeading).toBeInTheDocument();
		expect(sapiHeading).toBeInTheDocument();

		expect(screen.getByAltText(/peternak ayam/i)).toHaveAttribute(
			"src",
			"/ayam.jpg"
		);
		expect(screen.getByAltText(/peternak sapi/i)).toHaveAttribute(
			"src",
			"/sapi.jpg"
		);

		expect(
			screen.getByText(/peternak ayam sukses di desa/i)
		).toBeInTheDocument();
		expect(screen.getByText(/peternak sapi inspiratif/i)).toBeInTheDocument();
	});

	it("renders error message if fetch fails", async () => {
		(global.fetch as jest.Mock).mockImplementationOnce(() =>
			Promise.resolve({
				ok: false,
			})
		);

		render(<Gallery />);

		await waitFor(() =>
			expect(
				screen.getByText(/gagal mengambil data gallery/i)
			).toBeInTheDocument()
		);
	});
});
