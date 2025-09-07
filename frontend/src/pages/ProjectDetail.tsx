"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Heart,
	Share2,
	Bookmark,
	ExternalLink,
	Github,
	MessageCircle,
	ThumbsUp,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export default function ProjectDetail() {
	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 py-6">
				{/* Hero Section */}
				<motion.section
					className="relative h-96 bg-hero-gradient overflow-hidden"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
				>
					<div className="absolute inset-0">
						<img
							src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/serene-ocean-beach-landscape-NSinkp1DdBC9sGh1xOIOkDUbBAQoY4.jpg"
							alt="Project Hero"
							className="object-cover opacity-80 rounded-lg"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
					</div>
				</motion.section>

				<div className="container mx-auto px-4 -mt-20 relative z-10">
					{/* Project Header */}
					<motion.div
						className="bg-card rounded-xl p-8 shadow-2xl border border-border"
						{...fadeInUp}
					>
						<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
							<div>
								<h1 className="text-4xl font-bold mb-2">
									Ocean Serenity
								</h1>
								<p className="text-muted-foreground">
									By Alex Turner • Difficulty: Intermediate
								</p>
							</div>
							<div className="flex gap-3">
								<Button
									variant="outline"
									size="sm"
									className="gap-2 bg-transparent"
								>
									<Heart className="w-4 h-4" />
									Like
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="gap-2 bg-transparent"
								>
									<Share2 className="w-4 h-4" />
									Share
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="gap-2 bg-transparent"
								>
									<Bookmark className="w-4 h-4" />
									Save
								</Button>
							</div>
						</div>
					</motion.div>

					{/* Main Content */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
						{/* Left Column */}
						<motion.div
							className="lg:col-span-2 space-y-8"
							variants={staggerContainer}
							initial="initial"
							animate="animate"
						>
							{/* About Section */}
							<motion.section
								variants={fadeInUp}
								className="bg-section-light rounded-xl p-8"
							>
								<h2 className="text-2xl font-bold mb-4">
									About
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									This project addresses the common challenge
									of managing multiple tasks and projects
									efficiently. It provides a centralized
									platform for users to organize their work,
									set priorities, and track progress. Built
									with a robust backend and a user-friendly
									interface, it offers a seamless experience
									across devices.
								</p>
							</motion.section>

							{/* How it's built */}
							<motion.section
								variants={fadeInUp}
								className="bg-card rounded-xl p-8 border border-border"
							>
								<h2 className="text-2xl font-bold mb-4">
									How it's built
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									The application uses a modern tech stack,
									including React for the frontend, Node.js
									with Express for the backend, and PostgreSQL
									for the database. It leverages RESTful APIs
									for communication between the frontend and
									backend, ensuring scalability and
									maintainability. The user interface is
									designed with a focus on usability and
									accessibility, incorporating best practices
									for responsive design.
								</p>
							</motion.section>

							{/* Community Reactions */}
							<motion.section
								variants={fadeInUp}
								className="bg-section-lighter rounded-xl p-8"
							>
								<h2 className="text-2xl font-bold mb-6">
									Community Reactions
								</h2>
								<div className="flex items-center gap-6 mb-6">
									<div className="flex items-center gap-2">
										<ThumbsUp className="w-5 h-5 text-primary" />
										<span className="font-medium">14</span>
									</div>
									<div className="flex items-center gap-2">
										<MessageCircle className="w-5 h-5 text-primary" />
										<span className="font-medium">3</span>
									</div>
									<div className="flex items-center gap-2">
										<Heart className="w-5 h-5 text-primary" />
										<span className="font-medium">8</span>
									</div>
								</div>

								<div className="space-y-4">
									<motion.div
										className="flex gap-3"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.2 }}
									>
										<Avatar className="w-10 h-10">
											<AvatarImage src="/professional-headshot.png" />
											<AvatarFallback>SC</AvatarFallback>
										</Avatar>
										<div>
											<div className="flex items-center gap-2 mb-1">
												<span className="font-medium">
													Sophia Clark
												</span>
												<span className="text-sm text-muted-foreground">
													2 days ago
												</span>
											</div>
											<p className="text-sm text-muted-foreground">
												This is brilliant! The design is
												clean and intuitive, and the
												functionality is exactly what I
												was looking for. Great job!
											</p>
										</div>
									</motion.div>

									<motion.div
										className="flex gap-3"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.4 }}
									>
										<Avatar className="w-10 h-10">
											<AvatarImage src="/developer-portrait.png" />
											<AvatarFallback>EB</AvatarFallback>
										</Avatar>
										<div>
											<div className="flex items-center gap-2 mb-1">
												<span className="font-medium">
													Ethan Bennett
												</span>
												<span className="text-sm text-muted-foreground">
													1 day ago
												</span>
											</div>
											<p className="text-sm text-muted-foreground">
												Love the tech stack choice! It's
												a great combination of modern
												technologies that are
												well-suited for this type of
												application. The performance is
												impressive too.
											</p>
										</div>
									</motion.div>
								</div>
							</motion.section>
						</motion.div>

						{/* Right Sidebar */}
						<motion.div
							className="space-y-6"
							variants={staggerContainer}
							initial="initial"
							animate="animate"
						>
							{/* Links */}
							<motion.section variants={fadeInUp}>
								<Card className="bg-card border-border">
									<CardContent className="p-6">
										<h3 className="text-lg font-semibold mb-4">
											Links
										</h3>
										<div className="space-y-3">
											<Button
												variant="outline"
												className="w-full justify-start gap-2 bg-transparent"
											>
												<Github className="w-4 h-4" />
												GitHub Repository
												<ExternalLink className="w-4 h-4 ml-auto" />
											</Button>
											<Button
												variant="outline"
												className="w-full justify-start gap-2 bg-transparent"
											>
												<ExternalLink className="w-4 h-4" />
												Live Demo
												<ExternalLink className="w-4 h-4 ml-auto" />
											</Button>
										</div>
									</CardContent>
								</Card>
							</motion.section>

							{/* Tech Stack */}
							<motion.section variants={fadeInUp}>
								<Card className="bg-section-light border-border">
									<CardContent className="p-6">
										<h3 className="text-lg font-semibold mb-4">
											Tech Stack
										</h3>
										<div className="flex flex-wrap gap-2">
											<Badge variant="secondary">
												React
											</Badge>
											<Badge variant="secondary">
												Node.js
											</Badge>
											<Badge variant="secondary">
												Express
											</Badge>
											<Badge variant="secondary">
												PostgreSQL
											</Badge>
											<Badge variant="secondary">
												RESTful APIs
											</Badge>
										</div>
									</CardContent>
								</Card>
							</motion.section>
						</motion.div>
					</div>

					{/* Similar Projects */}
					<motion.section
						className="mt-16 mb-16"
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.6 }}
					>
						<h2 className="text-3xl font-bold mb-8">
							Similar Projects
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{[1, 2, 3].map((i) => (
								<motion.div
									key={i}
									whileHover={{ scale: 1.02, y: -5 }}
									transition={{ duration: 0.2 }}
								>
									<Card className="bg-card border-border overflow-hidden cursor-pointer">
										<CardContent className="p-0">
											<div className="h-48 relative">
												<img
													src={`/project-management-team.png?height=200&width=300&query=project ${i} landscape`}
													alt={`Project ${i}`}
													className="object-cover"
												/>
											</div>
											<div className="p-4">
												<h3 className="font-semibold mb-1">
													Project {i}
												</h3>
												<p className="text-sm text-muted-foreground">
													Brief description of Project{" "}
													{i}
												</p>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</motion.section>
				</div>
			</div>
		</div>
	);
}
