"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Gift } from "lucide-react";
import { ArrowRight, Users, Trophy, Filter, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Testimonials from "@/components/Testimonials";
import { ProjectCard } from "@/components/ProjectCard";
import { useEffect, useState } from "react";

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const cardHover = {
	hover: {
		scale: 1.05,
		y: -10,
		transition: { duration: 0.3, ease: "easeOut" },
	},
};

interface Project {
	id: string;
	title: string;
	author: string;
	tech: string[];
	likeCount: number;
	image: string;
	githubUrl?: string;
	liveUrl?: string;
}

export default function HomePage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/home`);
				const data = await res.json();

				// make sure keys match your ProjectCard props
				const formattedProjects = data.projects.map((p: any) => ({
					id: p.id,
					title: p.title,
					username: p.username,
					tags: p.tags || [],
					likeCount: p.likeCount,
					imageUrl: p.imageUrl,
					repoUrl: p.repoUrl,
					liveUrl: p.liveUrl,
					ideaId: p.ideaId,
				}));

				setProjects(formattedProjects);
			} catch (err) {
				console.error("Error fetching projects:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	return (
		<main className="min-h-screen bg-background">
			{/* Hero Section */}
			<motion.section
				className="relative overflow-hidden bg-hero-gradient py-20 sm:py-32"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
				<div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						className="text-center max-w-4xl mx-auto"
						variants={staggerContainer}
						initial="initial"
						animate="animate"
					>
						<motion.div variants={fadeInUp} className="mb-6">
							<motion.div
								className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
								whileHover={{ scale: 1.05 }}
							>
								<Sparkles className="w-4 h-4" />
								Join 10,000+ innovators
							</motion.div>
						</motion.div>

						<motion.h1
							variants={fadeInUp}
							className="text-4xl sm:text-6xl font-bold text-foreground mb-6 text-balance"
						>
							Build, share, and discover
							<motion.span
								className="text-primary block"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.5, duration: 0.6 }}
							>
								extraordinary projects
							</motion.span>
						</motion.h1>
						<motion.p
							variants={fadeInUp}
							className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty"
						>
							DevHub is the antidote to generic to-do lists. Find
							curated project ideas, showcase your work, and build
							a portfolio that truly impresses recruiters.
						</motion.p>
						<motion.div
							variants={fadeInUp}
							className="flex flex-col sm:flex-row gap-4 justify-center"
						>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link to="/login">
									<Button size="lg" className="text-lg px-8">
										Start your quest{" "}
										<ArrowRight className="ml-2 w-5 h-5" />
									</Button>
								</Link>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link to="/ideas">
									<Button
										variant="outline"
										size="lg"
										className="text-lg px-8 bg-transparent"
									>
										Browse projects
									</Button>
								</Link>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</motion.section>

			{/* Features Section */}
			<motion.section
				className="py-20 bg-section-light"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
							Beyond tutorials, into greatness
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Move past basic tutorials and build projects that
							showcase your real skills
						</p>
					</motion.div>

					<motion.div
						className="grid md:grid-cols-3 gap-8"
						variants={staggerContainer}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
					>
						{[
							{
								icon: Filter,
								title: "Curated & Filtered",
								description:
									"Find projects by difficulty, tech stack, and time commitment. No more endless scrolling through generic ideas.",
							},
							{
								icon: Users,
								title: "Community Driven",
								description:
									"See real implementations from other developers. Learn from their code, get inspired by their solutions.",
							},
							{
								icon: Trophy,
								title: "Portfolio Ready",
								description:
									"Build projects that actually impress recruiters. Each quest is designed to demonstrate real-world skills.",
							},
						].map((feature, index) => (
							<motion.div
								key={index}
								variants={fadeInUp}
								whileHover="hover"
							>
								<Card
									className="border-border hover:shadow-lg transition-shadow cursor-pointer"
									{...cardHover}
								>
									<CardContent className="p-6">
										<motion.div
											className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
											whileHover={{
												scale: 1.1,
												rotate: 5,
											}}
											transition={{ duration: 0.2 }}
										>
											<feature.icon className="w-6 h-6 text-primary" />
										</motion.div>
										<h3 className="text-xl font-semibold mb-2">
											{feature.title}
										</h3>
										<p className="text-muted-foreground">
											{feature.description}
										</p>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</motion.section>

			{/* Project Showcase */}
			<motion.section
				className="py-20 bg-section-lighter"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
							Featured project implementations
						</h2>
						<p className="text-xl text-muted-foreground">
							See how other developers tackled these challenges
						</p>
					</motion.div>

					{loading ? (
						<div className="text-center text-muted-foreground">
							Loading...
						</div>
					) : (
						<motion.div
							className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
							variants={staggerContainer}
							initial="initial"
							whileInView="animate"
							viewport={{ once: true }}
						>
							{projects.map((project, index) => (
								<ProjectCard
									key={project.id || index}
									{...project}
								/>
							))}
						</motion.div>
					)}
				</div>
			</motion.section>

			{/* Rewards Section */}
			<motion.section
				className="py-20 bg-background"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
							Earn points. Redeem rewards.
							<motion.span
								className="text-primary"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.3, duration: 0.6 }}
							>
								Level up.
							</motion.span>
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
							Contribute ideas, showcase projects, and engage with
							the community to earn points. Redeem points for
							exclusive rewards and level up your profile.
						</p>
					</motion.div>
				</div>

				<div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
					<motion.div
						className="grid grid-cols-1 md:grid-cols-3 gap-8"
						variants={staggerContainer}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
					>
						{/* Earn Points Card */}
						<motion.div variants={fadeInUp} whileHover="hover">
							<Card
								className="bg-card border-border overflow-hidden group cursor-pointer"
								{...cardHover}
							>
								<CardContent className="p-0">
									<motion.div
										className="h-48 bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center relative overflow-hidden"
										whileHover={{ scale: 1.05 }}
										transition={{ duration: 0.3 }}
									>
										<motion.div
											initial={{ rotate: 0 }}
											whileHover={{ rotate: 360 }}
											transition={{ duration: 0.6 }}
										>
											<TrendingUp className="w-16 h-16 text-amber-400" />
										</motion.div>
										<motion.div
											className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
											initial={{ x: "-100%" }}
											whileHover={{ x: "100%" }}
											transition={{ duration: 0.6 }}
										/>
									</motion.div>
									<div className="p-6">
										<h3 className="text-xl font-semibold mb-2">
											Earn Points
										</h3>
										<p className="text-muted-foreground">
											Contribute ideas, showcase projects,
											and engage with the community to
											earn points.
										</p>
									</div>
								</CardContent>
							</Card>
						</motion.div>

						{/* Redeem Rewards Card */}
						<motion.div variants={fadeInUp} whileHover="hover">
							<Card
								className="bg-card border-border overflow-hidden group cursor-pointer"
								{...cardHover}
							>
								<CardContent className="p-0">
									<motion.div
										className="h-48 bg-gradient-to-br from-pink-400/20 to-rose-500/20 flex items-center justify-center relative overflow-hidden"
										whileHover={{ scale: 1.05 }}
										transition={{ duration: 0.3 }}
									>
										<motion.div
											initial={{ scale: 1 }}
											whileHover={{ scale: 1.2 }}
											transition={{ duration: 0.3 }}
										>
											<Gift className="w-16 h-16 text-pink-400" />
										</motion.div>
										<motion.div
											className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
											initial={{ x: "-100%" }}
											whileHover={{ x: "100%" }}
											transition={{ duration: 0.6 }}
										/>
									</motion.div>
									<div className="p-6">
										<h3 className="text-xl font-semibold mb-2">
											Redeem Rewards
										</h3>
										<p className="text-muted-foreground">
											Redeem your points for exclusive
											rewards, including swag, discounts,
											and more.
										</p>
									</div>
								</CardContent>
							</Card>
						</motion.div>

						{/* Level Up Card */}
						<motion.div variants={fadeInUp} whileHover="hover">
							<Card
								className="bg-card border-border overflow-hidden group cursor-pointer"
								{...cardHover}
							>
								<CardContent className="p-0">
									<motion.div
										className="h-48 bg-gradient-to-br from-green-400/20 to-emerald-500/20 flex items-center justify-center relative overflow-hidden"
										whileHover={{ scale: 1.05 }}
										transition={{ duration: 0.3 }}
									>
										<motion.div
											initial={{ y: 0 }}
											whileHover={{ y: -10 }}
											transition={{ duration: 0.3 }}
										>
											<Trophy className="w-16 h-16 text-green-400" />
										</motion.div>
										<motion.div
											className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
											initial={{ x: "-100%" }}
											whileHover={{ x: "100%" }}
											transition={{ duration: 0.6 }}
										/>
									</motion.div>
									<div className="p-6">
										<h3 className="text-xl font-semibold mb-2">
											Level Up
										</h3>
										<p className="text-muted-foreground">
											Level up your profile by earning
											points and showcasing your
											contributions.
										</p>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>
				</div>
			</motion.section>

			{/* Testimonials Section */}
			<motion.section
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<Testimonials />
			</motion.section>

			{/* CTA Section */}
			<motion.section
				className="py-20 bg-pink-400 text-primary-foreground"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl sm:text-4xl font-bold mb-4">
							Ready to start your coding adventure?
						</h2>
						<p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
							Join thousands of developers building impressive
							projects and showcasing their skills
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link to="/ideas">
									<Button
										size="lg"
										variant="secondary"
										className="text-lg px-8"
									>
										Browse projects
									</Button>
								</Link>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link to="/signup">
									<Button
										size="lg"
										variant="outline"
										className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
									>
										Join the community
									</Button>
								</Link>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</motion.section>
		</main>
	);
}
