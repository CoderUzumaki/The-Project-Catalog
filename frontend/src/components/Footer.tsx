import { Link } from "react-router-dom";
import { SiX } from "react-icons/si";
import { Code } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import type { FC } from "react";

const Footer: FC = () => {
	return (
		<footer className="bg-[#fafaf9] text-gray-900 border-t border-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Brand Section */}
					<div className="col-span-1 md:col-span-2">
						<div className="flex items-center space-x-2 mb-3">
							<span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
								<Code className="w-5 h-5 text-primary-foreground" />
							</span>
							<span className="text-2xl font-bold text-primary">
								DevHub
							</span>
						</div>
						<p className="text-lg text-gray-600 mb-4 max-w-md">
							An Initiative by Team dUnder Pressure for the hack4odisha open track
						</p>
						<div className="flex space-x-4">
							<a
								href="https://github.com/CoderUzumaki/The-Project-Catalog"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-900 hover:text-cyan-500 transition-colors duration-200"
								aria-label="GitHub"
							>
								<FaGithub className="h-7 w-7" />
							</a>
							<a
								href="https://x.com/coderUzumaki"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-900 hover:text-cyan-500 transition-colors duration-200"
								aria-label="Twitter"
							>
								<SiX className="h-6 w-6 mt-0.5" />
							</a>
							<a
								href="https://www.linkedin.com/in/abhinavvv08"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-900 hover:text-cyan-500 transition-colors duration-200"
								aria-label="LinkedIn"
							>
								<FaLinkedin className="h-7 w-7" />
							</a>
							<a
								href="mailto:astar1013vt@gmail.com"
								className="text-gray-900 hover:text-cyan-500 transition-colors duration-200"
								aria-label="Email"
							>
								<FaEnvelope className="h-7 w-7" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-xl font-semibold mb-4">
							<u>Quick Links</u>
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="transition-all text-muted-foreground hover:text-cyan-500 hover:bg-white/40"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="transition-all text-muted-foreground hover:text-cyan-500 hover:bg-white/40"
								>
									About
								</Link>
							</li>
							<li>
								<Link
									to="/ideas"
									className="transition-all text-muted-foreground hover:text-cyan-500 hover:bg-white/40"
								>
									Explore
								</Link>
							</li>
						</ul>
					</div>

					{/* Support */}
					<div>
						<h3 className="text-xl font-semibold mb-4">
							<u>Support</u>
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/contact"
									className="transition-all text-muted-foreground hover:text-cyan-500"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									to="#"
									className="transition-all text-muted-foreground hover:text-cyan-500"
								>
									Help Center
								</Link>
							</li>
							
						</ul>
					</div>
				</div>

         {/* Bottom section with copyright and legal links */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-16 pt-8 border-t border-border">
            <p className="text-gray-600 text-sm">© 2025 DevHub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-600 hover:text-black text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-black text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

			</div>
		</footer>
	);
};

export default Footer;
