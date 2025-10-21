import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t py-6">
      <div className="text-center">
        &copy; {new Date().getFullYear()} Peternak Muda. All rights reserved.
      </div>

      {/* Social media links */}
      <nav aria-label="Sosial Media" className="mt-4">
        <ul className="flex items-center justify-center gap-4">
          <li>
            <a
              href="https://x.com/peternakmuda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Peternak Muda"
              className="text-sm text-blue-600 hover:underline"
            >
              Twitter
              <span className="sr-only"> Peternak Muda</span>
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com/peternakmuda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Peternak Muda"
              className="text-sm text-blue-600 hover:underline"
            >
              Facebook
              <span className="sr-only"> Peternak Muda</span>
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}