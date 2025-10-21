import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

jest.mock("next/font/google", () => ({
	Inter: () => ({ className: "mock-font" }),
}));

describe("RootLayout", () => {
	it("renders children", () => {
		render(
			<RootLayout>
				<div data-testid="child">Child Content</div>
			</RootLayout>
		);
		expect(screen.getByTestId("child")).toBeInTheDocument();
	});
});