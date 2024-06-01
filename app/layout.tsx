import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'Darts app',
	description: 'Made with ❤️ by the people at TWICE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={GeistSans.className}>
			<Analytics />
			<body className="bg-background text-foreground flex flex-col min-h-screen">
				<Navbar />
				<main className="flex flex-1 flex-col items-center">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
