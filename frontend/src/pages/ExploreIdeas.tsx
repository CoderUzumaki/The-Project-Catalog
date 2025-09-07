"use client";

import { useState, useEffect } from "react";
import Card from "@/./components/IdeaCard";
import {
	Loader2,
	Search,
	Filter,
	X,
	Heart,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

interface CardData {
	id: number;
	title: string;
	description: string;
	image_url: string;
	tags: string[];
	liked: boolean;
	like_count: number;
	difficulty: string;
	length: number;
  onClick?: () => void;
}

interface ApiResponse {
	ideas: CardData[];
	pagination: {
		page: number;
		total_pages: number;
		total_items: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
	};
	filters: {
		categories: string[];
		appliedFilters: {
			difficulty: string;
			search: string;
			liked: boolean;
		};
	};
}

export default function CardsExplorer() {
	const [cards, setCards] = useState<CardData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalCards, setTotalCards] = useState(0);

	const [filters, setFilters] = useState({
		difficulty: "all",
		search: "",
		liked: false,
	});
	const [availableCategories, setAvailableCategories] = useState<string[]>([
		"all",
		"easy",
		"medium",
		"hard",
	]);
	const [showFilters, setShowFilters] = useState(false);

	const fetchCards = async (page = 1, filterParams = filters) => {
		try {
			setLoading(true);

			const searchParams = new URLSearchParams({
				page: page.toString(),
				limit: "9",
				...(filterParams.difficulty !== "all" && {
					difficulty: filterParams.difficulty,
				}),
				...(filterParams.search && { search: filterParams.search }),
				...(filterParams.liked && { liked: "true" }),
			});

			const API_BASE = import.meta.env.VITE_API_URL.replace(/\/$/, "");
			const res = await fetch(`${API_BASE}/ideas?${searchParams.toString()}`);

			if (!res.ok) {
				throw new Error(`API error: ${res.status} ${res.statusText}`);
			}

			const data: ApiResponse = await res.json();
			setCards(data.ideas);
      setCurrentPage(data.pagination.page);
      setTotalPages(data.pagination.total_pages);
      setTotalCards(data.pagination.total_items);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	// Handle like/unlike
	const handleLike = async (cardId: number, currentLiked: boolean) => {
		try {
			const method = currentLiked ? "DELETE" : "POST";
			setCards((prevCards) =>
				prevCards.map((card) =>
					card.id === cardId
						? {
								...card,
								liked: !currentLiked,
								like_count: currentLiked
									? card.like_count - 1
									: card.like_count + 1,
						  }
						: card
				)
			);
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/ideas/${cardId}/like`,
				{ method }
			);
		} catch (err) {
			console.error("Failed to update like status:", err);
		}
	};

	const handleFilterChange = (newFilters: Partial<typeof filters>) => {
		const updatedFilters = { ...filters, ...newFilters };
		setFilters(updatedFilters);
		setCurrentPage(1); // Reset to first page when filters change
		fetchCards(1, updatedFilters);
	};

	const clearFilters = () => {
		const defaultFilters = { difficulty: "all", search: "", liked: false };
		setFilters(defaultFilters);
		setCurrentPage(1);
		fetchCards(1, defaultFilters);
	};

	const hasActiveFilters =
		filters.difficulty !== "all" || filters.search !== "" || filters.liked;

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			setCurrentPage(page);
			fetchCards(page, filters);
			// Scroll to top when page changes
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	// Generate page numbers for pagination
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			// Show all pages if total is small
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Smart pagination with ellipsis
			if (currentPage <= 3) {
				// Show first pages
				for (let i = 1; i <= 4; i++) {
					pages.push(i);
				}
				pages.push("...");
				pages.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				// Show last pages
				pages.push(1);
				pages.push("...");
				for (let i = totalPages - 3; i <= totalPages; i++) {
					pages.push(i);
				}
			} else {
				// Show middle pages
				pages.push(1);
				pages.push("...");
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(i);
				}
				pages.push("...");
				pages.push(totalPages);
			}
		}

		return pages;
	};

	// Load initial data
	useEffect(() => {
		fetchCards();
	}, []);

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

	if (error) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center space-y-4">
					<h2 className="text-xl font-semibold text-foreground">
						Something went wrong
					</h2>
					<p className="text-muted-foreground">{error}</p>
					<button
						onClick={() => fetchCards(currentPage)}
						className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Header Section */}
			<div className="bg-gradient-to-b from-muted/50 to-background border-b border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
					<div className="text-center space-y-4 sm:space-y-6">
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
							Discover Amazing Content
						</h1>
						<p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto text-pretty leading-relaxed">
							Explore our curated collection of inspiring stories,
							creative projects, and fascinating discoveries. From
							breathtaking adventures to cutting-edge innovations,
							find content that sparks your curiosity and ignites
							your imagination.
						</p>
						<div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
							<span>{totalCards} amazing discoveries</span>
							<span>•</span>
							<span>Updated daily</span>
						</div>
					</div>
				</div>
			</div>

			{/* Filters Section */}
			<div className="bg-card/50 border-b border-border sticky top-0 z-40 backdrop-blur-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
					{/* Filter Toggle Button (Mobile) */}
					<div className="flex items-center justify-between mb-4 lg:hidden">
						<h2 className="text-base font-semibold text-foreground">
							Filters & Search
						</h2>
						<button
							onClick={() => setShowFilters(!showFilters)}
							className="flex items-center gap-2 px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
						>
							<Filter className="h-4 w-4" />
							{showFilters ? "Hide" : "Show"} Filters
							{hasActiveFilters && (
								<span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
							)}
						</button>
					</div>

					{/* Filters Content */}
					<div
						className={`space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-6 ${
							showFilters ? "block" : "hidden lg:flex"
						}`}
					>
						{/* Search Input */}
						<div className="relative flex-1 max-w-sm lg:max-w-md">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<input
								type="text"
								placeholder="Search cards..."
								value={filters.search}
								onChange={(e) =>
									handleFilterChange({
										search: e.target.value,
									})
								}
								className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
							/>
						</div>

						{/* Category Filter */}
						<div className="flex items-center gap-3">
							<label
								htmlFor="difficulty-select"
								className="text-sm font-medium text-foreground whitespace-nowrap"
							>
								Category:
							</label>
							<select
								id="difficulty-select"
								value={filters.difficulty}
								onChange={(e) =>
									handleFilterChange({
										difficulty: e.target.value,
									})
								}
								className="px-3 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent capitalize min-w-[140px] transition-colors"
							>
								{availableCategories.map((difficulty) => (
									<option
										key={difficulty}
										value={difficulty}
										className="capitalize"
									>
										{difficulty === "all"
											? "All Categories"
											: difficulty}
									</option>
								))}
							</select>
						</div>

						{/* Liked Filter */}
						<div className="flex items-center gap-2">
							<button
								onClick={() =>
									handleFilterChange({
										liked: !filters.liked,
									})
								}
								className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
									filters.liked
										? "bg-destructive/10 text-destructive border border-destructive/20 shadow-sm"
										: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
								}`}
							>
								<Heart
									className={`h-4 w-4 transition-transform ${
										filters.liked
											? "fill-current scale-110"
											: ""
									}`}
								/>
								<span className="hidden sm:inline">
									{filters.liked
										? "Liked Only"
										: "Show Liked"}
								</span>
								<span className="sm:hidden">
									{filters.liked ? "Liked" : "All"}
								</span>
							</button>
						</div>

						{/* Clear Filters */}
						{hasActiveFilters && (
							<button
								onClick={clearFilters}
								className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
							>
								<X className="h-4 w-4" />
								<span className="hidden sm:inline">
									Clear Filters
								</span>
								<span className="sm:hidden">Clear</span>
							</button>
						)}
					</div>

					{/* Active Filters Display */}
					{hasActiveFilters && (
						<div className="mt-4 flex flex-wrap items-center gap-2">
							<span className="text-xs sm:text-sm text-muted-foreground font-medium">
								Active filters:
							</span>
							{filters.difficulty !== "all" && (
								<span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20">
									<span className="capitalize">
										{filters.difficulty}
									</span>
									<button
										onClick={() =>
											handleFilterChange({
												difficulty: "all",
											})
										}
										className="hover:bg-primary/20 rounded-full p-0.5 transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
										aria-label={`Remove ${filters.difficulty} filter`}
									>
										<X className="h-3 w-3" />
									</button>
								</span>
							)}
							{filters.search && (
								<span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20">
									<span className="max-w-[100px] truncate">
										"{filters.search}"
									</span>
									<button
										onClick={() =>
											handleFilterChange({ search: "" })
										}
										className="hover:bg-primary/20 rounded-full p-0.5 transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
										aria-label="Remove search filter"
									>
										<X className="h-3 w-3" />
									</button>
								</span>
							)}
							{filters.liked && (
								<span className="inline-flex items-center gap-1 px-2 py-1 bg-destructive/10 text-destructive text-xs rounded-md border border-destructive/20">
									<Heart className="h-3 w-3 fill-current" />
									<span>Liked</span>
									<button
										onClick={() =>
											handleFilterChange({ liked: false })
										}
										className="hover:bg-destructive/20 rounded-full p-0.5 transition-colors focus:outline-none focus:ring-1 focus:ring-destructive"
										aria-label="Remove liked filter"
									>
										<X className="h-3 w-3" />
									</button>
								</span>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Cards Grid */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
				{/* Loading overlay for pagination */}
				{loading && cards.length > 0 && (
					<div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center">
						<div className="flex items-center gap-3 text-foreground bg-card border border-border rounded-xl px-6 py-4 shadow-lg">
							<Loader2 className="h-5 w-5 animate-spin" />
							<span className="font-medium">Loading...</span>
						</div>
					</div>
				)}

				{/* Results Summary */}
				{!loading && cards.length > 0 && (
					<div className="mb-6 sm:mb-8">
						<p className="text-sm text-muted-foreground">
							{hasActiveFilters
								? "Filtered results: "
								: "Showing "}
							<span className="font-medium text-foreground">
								{totalCards}
							</span>
							{totalCards === 1 ? " card" : " cards"}
							{hasActiveFilters && (
								<>
									{" "}
									<button
										onClick={clearFilters}
										className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
									>
										(clear filters)
									</button>
								</>
							)}
						</p>
					</div>
				)}

				{/* Cards Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
					{cards.map((card) => (
						<Card
							key={card.id}
							title={card.title}
							description={card.description}
							image_url={card.image_url}
							tags={[card.difficulty]}
							liked={card.liked}
							like_count={card.like_count}
							onLike={() => handleLike(card.id, card.liked)}
							onMore={() =>
								console.log(`More options for card ${card.id}`)
							}
              onClick={() => window.open(`/ideas/${card.id}`, '_blank')}
							className="h-full transform transition-transform duration-200 hover:scale-[1.02] focus-within:scale-[1.02]"
						/>
					))}
				</div>

				{/* Empty State */}
				{cards.length === 0 && !loading && (
					<div className="text-center py-16 sm:py-20">
						<div className="max-w-md mx-auto space-y-4">
							<div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
								<Search className="h-8 w-8 text-muted-foreground" />
							</div>
							<h3 className="text-lg font-semibold text-foreground">
								No cards found
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{hasActiveFilters
									? "No cards match your current filters. Try adjusting your search terms or difficulty selection."
									: "No cards are available at the moment. Please check back later."}
							</p>
							{hasActiveFilters && (
								<button
									onClick={clearFilters}
									className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-medium"
								>
									Clear All Filters
								</button>
							)}
						</div>
					</div>
				)}

				{/* Pagination Controls */}
				{totalPages > 1 && (
					<div className="mt-12 sm:mt-16 space-y-6">
						<div className="flex items-center justify-center">
							<nav
								className="flex items-center gap-1 sm:gap-2"
								aria-label="Pagination"
							>
								{/* First Page Button */}
								<button
									onClick={() => handlePageChange(1)}
									disabled={currentPage === 1}
									className="p-2 sm:p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
									aria-label="Go to first page"
								>
									<ChevronsLeft className="h-4 w-4 sm:h-5 sm:w-5" />
								</button>

								{/* Previous Page Button */}
								<button
									onClick={() =>
										handlePageChange(currentPage - 1)
									}
									disabled={currentPage === 1}
									className="p-2 sm:p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
									aria-label="Go to previous page"
								>
									<ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
								</button>

								{/* Page Numbers */}
								<div className="flex items-center gap-1 mx-2 sm:mx-4">
									{getPageNumbers().map((page, index) => (
										<div key={index}>
											{page === "..." ? (
												<span className="px-2 sm:px-3 py-2 text-muted-foreground text-sm">
													...
												</span>
											) : (
												<button
													onClick={() =>
														handlePageChange(
															page as number
														)
													}
													className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
														currentPage === page
															? "bg-primary text-primary-foreground shadow-sm"
															: "text-muted-foreground hover:text-foreground hover:bg-accent"
													}`}
													aria-label={`Go to page ${page}`}
													aria-current={
														currentPage === page
															? "page"
															: undefined
													}
												>
													{page}
												</button>
											)}
										</div>
									))}
								</div>

								{/* Next Page Button */}
								<button
									onClick={() =>
										handlePageChange(currentPage + 1)
									}
									disabled={currentPage === totalPages}
									className="p-2 sm:p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
									aria-label="Go to next page"
								>
									<ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
								</button>

								{/* Last Page Button */}
								<button
									onClick={() => handlePageChange(totalPages)}
									disabled={currentPage === totalPages}
									className="p-2 sm:p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
									aria-label="Go to last page"
								>
									<ChevronsRight className="h-4 w-4 sm:h-5 sm:w-5" />
								</button>
							</nav>
						</div>

						{/* Pagination Info */}
						<div className="text-center">
							<p className="text-sm text-muted-foreground">
								Showing{" "}
								<span className="font-medium text-foreground">
									{(currentPage - 1) * 9 + 1}
								</span>{" "}
								to{" "}
								<span className="font-medium text-foreground">
									{Math.min(currentPage * 9, totalCards)}
								</span>{" "}
								of{" "}
								<span className="font-medium text-foreground">
									{totalCards}
								</span>{" "}
								cards
							</p>
						</div>

						{/* Mobile-friendly Page Jump */}
						<div className="flex items-center justify-center gap-4 sm:hidden">
							<span className="text-sm text-muted-foreground font-medium">
								Page
							</span>
							<select
								value={currentPage}
								onChange={(e) =>
									handlePageChange(Number(e.target.value))
								}
								className="px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent min-w-[60px]"
							>
								{Array.from(
									{ length: totalPages },
									(_, i) => i + 1
								).map((page) => (
									<option key={page} value={page}>
										{page}
									</option>
								))}
							</select>
							<span className="text-sm text-muted-foreground">
								of {totalPages}
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
