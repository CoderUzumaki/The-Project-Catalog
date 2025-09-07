import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	FaSignOutAlt,
	FaBars,
	FaTimes,
} from "react-icons/fa";
import { Code } from "lucide-react";
import { Button } from "./ui/button";

// Define user type
interface User {
	name: string;
	email: string;
	avatar?: string;
}

// Define auth hook return type
interface AuthContext {
	user: User | null;
	isLoggedIn: boolean;
	logout: () => void;
}

function useAuth(): AuthContext {
	// Replace with your actual auth logic
	return {
		user: { name: "John Doe", email: "john@example.com" },
		isLoggedIn: true,
		logout: () => console.log("Logged out"),
	};
}

const Header: React.FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { isLoggedIn } = useAuth(); // Use the auth hook


	const toggleMobileMenu = () => {
		setIsMobileMenuOpen((prev) => !prev);
	};

	return (
		<nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 transition-colors duration-300">
			<div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex items-center space-x-2">
						<Link to="/" className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
								<Code className="w-5 h-5 text-primary-foreground" />
							</div>
							<span className="text-xl font-bold text-foreground">
								DevHub
							</span>
						</Link>
					</div>

					{/* Navigation Links */}
					<div className="hidden md:flex items-center space-x-8">
						<Link
							to="/"
							className="transition-all text-muted-foreground hover:text-cyan-500 hover:bg-white/40"
						>
							Home
						</Link>

						<Link
							to="/about"
							className="transition-all text-muted-foreground hover:text-cyan-500 hover:bg-white/40"
						>
							About
						</Link>

						<Link
							to="/ideas"
							className="transition-all text-muted-foreground hover:text-cyan-500 hover:bg-white/40"
						>
							Explore
						</Link>

						<Link
							to="/contact"
							className="transition-all text-muted-foreground hover:text-cyan-500 hover:bg-white/40"
						>
							Contact Us
						</Link>
					</div>

					{/* User Section */}
					<div className="hidden md:flex items-center space-x-4">
						<Link to="/login">
							<Button size="sm">Get started</Button>
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<button
							onClick={toggleMobileMenu}
							className="text-gray-700 hover:text-gray-900 focus:outline-none"
						>
							{isMobileMenuOpen ? (
								<FaTimes size={20} />
							) : (
								<FaBars size={20} />
							)}
						</button>
					</div>
				</div>

				{isMobileMenuOpen && (
					<div className="md:hidden mt-2 space-y-2 pb-4">
						{!isLoggedIn ? (
							<div className="space-y-2 pt-2">
								<Link to="/login">
									<Button size="sm">Get started</Button>
								</Link>
							</div>
						) : (
							<div className="space-y-2 pt-2">
								<Link
									to="/profile"
									className="block transition-all duration-200 text-muted-foreground hover:text-cyan-500 hover:bg-white/40"
								>
									Profile
								</Link>
								<Button
								size="sm" className="w-full flex items-center justify-center mt-2"
								>

									<FaSignOutAlt className="mr-2" />
									Logout
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Header;
