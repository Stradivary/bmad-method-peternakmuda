/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "../Hero";

// Mock framer-motion agar tidak error di Jest
jest.mock("framer-motion", () => ({
	motion: {
		section: (props: any) => <section {...props} />,
	},
}));

describe("Hero Component", () => {
	it("renders heading with 'Peternak Muda'", () => {
		render(<Hero />);
		const heading = screen.getByRole("heading", { name: /peternak muda/i });
		expect(heading).toBeInTheDocument();
	});

	it("renders description text", () => {
		render(<Hero />);
		expect(
			screen.getByText(/Platform kolaborasi dan edukasi/i)
		).toBeInTheDocument();
	});

	it("renders CTA link with 'Daftar Sekarang'", () => {
		render(<Hero />);
		const ctaLink = screen.getByRole("link", { name: /daftar sekarang/i });
		expect(ctaLink).toHaveAttribute("href", "/register");
	});
});
