import { render, screen } from "@testing-library/react";
import About from "../About";

describe("About Component", () => {
	it("renders heading", () => {
		render(<About />);
		expect(screen.getByText(/tentang peternak muda/i)).toBeInTheDocument();
	});

	it("renders platform description", () => {
		render(<About />);
		expect(
			screen.getByText(/komunitas yang mendukung generasi muda/i)
		).toBeInTheDocument();
	});
});
