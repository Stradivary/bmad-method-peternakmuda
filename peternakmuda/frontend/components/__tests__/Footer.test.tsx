import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
	it("renders copyright text", () => {
		render(<Footer />);
		const copyright = screen.getByText(/©|copyright/i);
		expect(copyright).toBeInTheDocument();
	});

	it("renders at least one social media link", () => {
		render(<Footer />);
		const links = screen.queryAllByRole("link");
		expect(links.length).toBeGreaterThan(0);
	});

	it("renders social media icons with accessible labels", () => {
		render(<Footer />);
		const possibleSocials = ["instagram", "facebook", "twitter", "youtube", "linkedin"];
		const found = possibleSocials.some((social) =>
			screen.queryByRole("link", { name: new RegExp(social, "i") })
		);
		expect(found).toBeTruthy();
	});
});

describe("Footer social links", () => {
	it("renders Twitter link with correct attributes", () => {
		render(<Footer />);
		const link = screen.getByRole("link", { name: /twitter peternak muda/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "https://x.com/peternakmuda");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel");
		expect(link.getAttribute("rel")).toMatch(/noopener/i);
	});

	it("renders Facebook link with correct attributes", () => {
		render(<Footer />);
		const link = screen.getByRole("link", { name: /facebook peternak muda/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "https://facebook.com/peternakmuda");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel");
		expect(link.getAttribute("rel")).toMatch(/noopener/i);
	});
});
