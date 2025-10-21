import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommunityStats from "../CommunityStats";

describe("CommunityStats Component", () => {
	it("renders without crashing", () => {
		const { container } = render(<CommunityStats />);
		const section = container.querySelector("section");
		expect(section).toBeInTheDocument();
	});

	it("renders all stats correctly", () => {
		render(<CommunityStats />);
		expect(screen.getByText(/anggota/i)).toBeInTheDocument();
		expect(screen.getByText(/proyek/i)).toBeInTheDocument();
		expect(screen.getByText(/mitra/i)).toBeInTheDocument();

		expect(screen.getByText("1200")).toBeInTheDocument();
		expect(screen.getByText("35")).toBeInTheDocument();
		expect(screen.getByText("12")).toBeInTheDocument();
	});

	it("renders correct number of stat cards", () => {
		render(<CommunityStats />);
		const values = screen.getAllByText(/\d+/);
		expect(values).toHaveLength(3);
	});

	it("displays each stat with label and value pair", () => {
		render(<CommunityStats />);
		expect(screen.getByText("1200")).toBeInTheDocument();
		expect(screen.getByText(/anggota/i)).toBeInTheDocument();
	});
});
