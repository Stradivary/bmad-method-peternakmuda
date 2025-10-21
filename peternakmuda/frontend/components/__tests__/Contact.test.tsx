import { render, screen } from "@testing-library/react";
import Contact from "../ContactForm";

describe("Contact Component", () => {
	it("renders contact section", () => {
		render(<Contact />);
		expect(screen.getByText(/hubungi kami/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/nama/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/pesan/i)).toBeInTheDocument();
	});
});