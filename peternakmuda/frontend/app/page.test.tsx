import React from "react";

// Mock framer-motion agar tidak memuat modul asli saat test
jest.mock("framer-motion", () => {
	const React = require("react");
	const identity =
		(Tag: any = "div") =>
			React.forwardRef((props: any, ref: any) =>
				React.createElement(Tag, { ref, ...props })
			);

	const motion = new Proxy(
		{},
		{
			get: (_: any, tag: string) => identity(tag),
		}
	);

	const AnimatePresence = ({ children }: any) =>
		React.createElement(React.Fragment, null, children);

	return { motion, AnimatePresence };
});

import { render } from "@testing-library/react";
import Page from "./page";

jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		prefetch: jest.fn(),
		back: jest.fn(),
		forward: jest.fn(),
	}),
	usePathname: () => "/",
	useSearchParams: () => new URLSearchParams(""),
}));

describe("Home Page", () => {
	it("renders without crashing", () => {
		const { container } = render(<Page />);
		expect(container.firstChild).toBeTruthy();
	});
});