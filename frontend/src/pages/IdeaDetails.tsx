"use client";

import { motion } from "framer-motion";
import { CheckCircle, Lightbulb, Loader2, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Idea = {
	title?: string;
	author?: string;
    description?: string;
	solution?: string;
    id: number;
    comments: number;
};

type Comment = {
	name?: string;
	text?: string;
	timestamp?: string;
};

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

const commentVariants = {
	hidden: { opacity: 0, x: -20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
		},
	},
};

export default function DevIdeasPage() {
	const { id } = useParams();
	const [idea, setIdea] = useState<Idea | null>(null);
	const [loading, setLoading] = useState(true);
	const [comments, setComments] = useState<Comment[]>([]);

	useEffect(() => {
		const fetchComments = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/ideas/${id}/comments`
			);
			const data = await response.json();
			setComments(data);
		};
		fetchComments();
	}, [id]);

	useEffect(() => {
		const fetchIdea = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/ideas/${id}`
			);
			const data = await response.json();
			setIdea(data);
            setLoading(false);
		};

		fetchIdea();
	}, [id]);

	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="flex items-center gap-2 text-muted-foreground">
					<Loader2 className="h-6 w-6 animate-spin" />
					<span>Loading cards...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
			{/* Main Content */}
			<main className="flex-1 bg-section-light px-10 py-12 lg:px-20">
				<div className="mx-auto max-w-5xl">
					<motion.div
						className="mb-12 text-center"
						initial={{ opacity: 0, y: -30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-4xl font-extrabold tracking-tight text-white text-balance"> 
							{`Project Idea ${idea?.title ?? ""}`}
						</h2>
						<p className="mt-4 text-lg text-purple-200">
							Submitted by{" "}
							<a
								href="#"
								className="font-medium text-purple-300 hover:text-purple-100 transition-colors duration-200 hover:underline"
							>
								{idea?.author || "Anonymous"}
							</a>
						</p>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 gap-12 lg:grid-cols-3"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{/* Left Column */}
						<div className="space-y-12 lg:col-span-2">
							<motion.section variants={itemVariants}>
								<div className="mb-6 flex items-center gap-4">
									<motion.div
										className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 p-3 text-white shadow-lg"
										whileHover={{ scale: 1.05, rotate: 5 }}
										transition={{
											type: "spring",
											stiffness: 300,
										}}
									>
										<Lightbulb className="h-7 w-7" />
									</motion.div>
									<h3 className="text-2xl font-bold text-white">
										Problem Statement
									</h3>
								</div>
								<motion.p
									className="text-base leading-relaxed text-purple-100"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.2, duration: 0.5 }}
								>
									{idea?.description || "No description provided."}
								</motion.p>
							</motion.section>

							<motion.section variants={itemVariants}>
								<div className="mb-6 flex items-center gap-4">
									<motion.div
										className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-3 text-white shadow-lg"
										whileHover={{ scale: 1.05, rotate: -5 }}
										transition={{
											type: "spring",
											stiffness: 300,
										}}
									>
										<CheckCircle className="h-7 w-7" />
									</motion.div>
									<h3 className="text-2xl font-bold text-white">
										The Solution
									</h3>
								</div>
								<motion.p
									className="text-base leading-relaxed text-purple-100"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.4, duration: 0.5 }}
								>
									{idea?.solution || "No solution provided."}
								</motion.p>
							</motion.section>

							{/* Projects Showcase section */}
							<motion.section variants={itemVariants}>
								<h3 className="mb-8 text-2xl font-bold text-white">
									Projects Showcase
								</h3>
								<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
									<motion.div
										className="rounded-xl border border-purple-400 bg-section-lighter/50 backdrop-blur-sm p-4 shadow-lg"
										whileHover={{ scale: 1.05, y: -5 }}
										transition={{
											type: "spring",
											stiffness: 300,
										}}
									>
										<div className="mb-4 h-32 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
											<div className="text-white text-xs space-y-1">
												<div className="h-2 w-16 bg-white/30 rounded"></div>
												<div className="h-2 w-12 bg-white/30 rounded"></div>
												<div className="h-2 w-20 bg-white/30 rounded"></div>
											</div>
										</div>
										<h4 className="font-semibold text-white mb-2">
											Collaborative Editor Project
										</h4>
										<p className="text-sm text-purple-200">
											A robust collaborative editor with
											advanced features.
										</p>
									</motion.div>

									<motion.div
										className="rounded-xl border border-purple-400 bg-section-lighter/50 backdrop-blur-sm p-4 shadow-lg"
										whileHover={{ scale: 1.05, y: -5 }}
										transition={{
											type: "spring",
											stiffness: 300,
										}}
									>
										<div className="mb-4 h-32 rounded-lg bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center">
											<div className="text-white text-xs space-y-2">
												<div className="h-1 w-20 bg-white/40 rounded"></div>
												<div className="h-1 w-16 bg-white/40 rounded"></div>
												<div className="h-1 w-18 bg-white/40 rounded"></div>
												<div className="h-1 w-14 bg-white/40 rounded"></div>
											</div>
										</div>
										<h4 className="font-semibold text-white mb-2">
											Real-Time DocuEdit
										</h4>
										<p className="text-sm text-purple-200">
											A simple and intuitive real-time
											document editing tool.
										</p>
									</motion.div>

									<motion.div
										className="rounded-xl border border-purple-400 bg-section-lighter/50 backdrop-blur-sm p-4 shadow-lg"
										whileHover={{ scale: 1.05, y: -5 }}
										transition={{
											type: "spring",
											stiffness: 300,
										}}
									>
										<div className="mb-4 h-32 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
											<div className="bg-white/20 rounded-lg p-4 w-20 h-20 flex items-center justify-center">
												<div className="text-white text-xs">
													📝
												</div>
											</div>
										</div>
										<h4 className="font-semibold text-white mb-2">
											SyncWrite
										</h4>
										<p className="text-sm text-purple-200">
											A lightweight collaborative writing
											application.
										</p>
									</motion.div>
								</div>
							</motion.section>
						</div>

						{/* Right Column (Sidebar) */}
						<div className="space-y-8 lg:col-span-1">
							<motion.section variants={itemVariants}>
								<h3 className="mb-6 text-xl font-bold text-white">
									Comments ({comments.length})
								</h3>
								{/* Scrollable Timeline container */}
								<div className="h-72 space-y-6 overflow-y-auto border-l-2 border-purple-400 bg-section-lighter/50 backdrop-blur-sm rounded-lg p-4 pl-6 pr-4">
									{comments.map((comment, index) => (
										<motion.div
											key={index}
											variants={commentVariants}
											initial="hidden"
											animate="visible"
											transition={{ delay: index * 0.1 }}
											whileHover={{ scale: 1.02, x: 5 }}
											className="cursor-pointer"
										>
											<div className="flex-1">
												<div className="flex items-baseline gap-2">
													<p className="text-sm font-semibold text-purple-200">
														{comment.name || "User"}
													</p>
													<p className="text-xs text-purple-300">
														{comment.timestamp || "Just now"}
													</p>
												</div>
												<p className="mt-1 text-sm text-purple-100">
													{comment.text || ""}
												</p>
											</div>
										</motion.div>
									))}
								</div>
								{/* Form to add a new comment */}
								<motion.div
									className="mt-6 border-t border-purple-400 pt-6"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.6, duration: 0.5 }}
								>
									<div>
										<Textarea
											placeholder="Add a comment..."
											className="w-full bg-section-lighter/50 border-purple-400 text-white placeholder:text-purple-300 focus:border-purple-300"
											rows={3}
										/>
										<motion.div
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<Button className="mt-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-lg">
												Post Comment
											</Button>
										</motion.div>
									</div>
								</motion.div>
							</motion.section>

							<motion.section variants={itemVariants}>
								<div className="mb-6 flex items-center gap-4">
									<motion.div
										className="rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 p-3 text-white shadow-lg"
										whileHover={{ scale: 1.05, rotate: 5 }}
										transition={{
											type: "spring",
											stiffness: 300,
										}}
									>
										<Rocket className="h-7 w-7" />
									</motion.div>
									<h3 className="text-2xl font-bold text-white">
										Submit Your Work
									</h3>
								</div>
								<motion.div
									className="rounded-xl border border-purple-400 bg-section-lighter/50 backdrop-blur-sm p-6 shadow-lg"
									whileHover={{ scale: 1.02 }}
									transition={{
										type: "spring",
										stiffness: 300,
									}}
								>
									<p className="mb-4 text-sm text-purple-100">
										Have you created your own implementation
										of this idea? Share your work with the
										community and inspire others!
									</p>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-lg">
											Contribute Your Implementation
										</Button>
									</motion.div>
								</motion.div>
							</motion.section>
						</div>
					</motion.div>
				</div>
			</main>
		</div>
	);
}
