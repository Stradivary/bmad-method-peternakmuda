import Hero from "../components/Hero";
import CommunityStats from "../components/CommunityStats";
import About from "../components/About";
import Gallery from "../components/Gallery";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function HomePage() {
	return (
		<main className="bg-gradient-to-b from-white via-blue-50 to-green-50 min-h-screen font-sans">
			<div className="container mx-auto px-4 space-y-12">
				<Hero />
				<CommunityStats />
				<About />
				<Gallery />
				<ContactForm />
			</div>
			<Footer />
		</main>
	);
}