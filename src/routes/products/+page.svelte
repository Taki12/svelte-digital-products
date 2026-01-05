<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Separator } from "$lib/components/ui/separator";
  import * as Select from "$lib/components/ui/select";
  import {
    Search,
    Filter,
    Grid,
    List,
    Star,
    Download,
    Heart,
    Code,
    BookOpen,
    GraduationCap,
    Palette,
    Sparkles,
    SlidersHorizontal,
    X,
    ChevronDown,
    ArrowUpDown
  } from "lucide-svelte";

  let searchQuery = $state("");
  let viewMode = $state<"grid" | "list">("grid");
  let showFilters = $state(true);
  let selectedCategory = $state<string | null>(null);
  let priceRange = $state<[number, number]>([0, 500]);
  let selectedRating = $state<number | null>(null);
  let sortBy = $state("popular");

  const categories = [
    { id: "software", name: "Software", icon: Code, count: 234 },
    { id: "templates", name: "Templates", icon: Palette, count: 456 },
    { id: "courses", name: "Courses", icon: GraduationCap, count: 128 },
    { id: "ebooks", name: "Ebooks", icon: BookOpen, count: 312 },
    { id: "assets", name: "Digital Assets", icon: Sparkles, count: 892 }
  ];

  const products = [
    {
      id: 1,
      name: "ProCode IDE Theme Bundle",
      description: "50+ stunning themes for VS Code, JetBrains, and more. Perfect for developers who want a beautiful coding environment.",
      price: 29,
      originalPrice: 49,
      rating: 4.9,
      reviews: 1284,
      category: "software",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=400&fit=crop&auto=format",
      badge: "Best Seller",
      downloads: "12.5k",
      author: "Alex Chen"
    },
    {
      id: 2,
      name: "Full-Stack Development Masterclass",
      description: "Complete course covering React, Node.js, PostgreSQL, and deployment. 40+ hours of content.",
      price: 89,
      originalPrice: 199,
      rating: 4.8,
      reviews: 856,
      category: "courses",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop&auto=format",
      badge: "Featured",
      downloads: "8.2k",
      author: "David Park"
    },
    {
      id: 3,
      name: "UI Component Library Pro",
      description: "500+ customizable React & Vue components with full TypeScript support and documentation.",
      price: 79,
      originalPrice: 129,
      rating: 4.9,
      reviews: 2341,
      category: "templates",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=400&fit=crop&auto=format",
      badge: "Top Rated",
      downloads: "25.8k",
      author: "Sarah Miller"
    },
    {
      id: 4,
      name: "Design Systems Handbook",
      description: "Complete guide to building scalable design systems for enterprise applications.",
      price: 24,
      originalPrice: 39,
      rating: 4.7,
      reviews: 567,
      category: "ebooks",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&h=400&fit=crop&auto=format",
      badge: "New",
      downloads: "5.1k",
      author: "Emily Rose"
    },
    {
      id: 5,
      name: "AI Prompt Engineering Guide",
      description: "Master the art of prompt engineering for ChatGPT, Claude, and other AI models.",
      price: 19,
      originalPrice: 29,
      rating: 4.8,
      reviews: 423,
      category: "ebooks",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=400&fit=crop&auto=format",
      badge: "Trending",
      downloads: "7.3k",
      author: "James Wilson"
    },
    {
      id: 6,
      name: "SaaS Starter Kit",
      description: "Production-ready Next.js + Supabase template with auth, payments, and admin dashboard.",
      price: 149,
      originalPrice: 249,
      rating: 4.9,
      reviews: 892,
      category: "templates",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop&auto=format",
      badge: "Premium",
      downloads: "4.2k",
      author: "Alex Chen"
    },
    {
      id: 7,
      name: "3D Icon Pack Pro",
      description: "500+ high-quality 3D icons in multiple formats. Perfect for modern UI design.",
      price: 39,
      originalPrice: 59,
      rating: 4.7,
      reviews: 634,
      category: "assets",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=400&fit=crop&auto=format",
      downloads: "9.8k",
      author: "Sarah Miller"
    },
    {
      id: 8,
      name: "DevOps Automation Scripts",
      description: "Collection of 100+ shell scripts for CI/CD, monitoring, and infrastructure automation.",
      price: 59,
      originalPrice: 89,
      rating: 4.8,
      reviews: 234,
      category: "software",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500&h=400&fit=crop&auto=format",
      downloads: "3.1k",
      author: "David Park"
    },
    {
      id: 9,
      name: "Mobile App UI Kit",
      description: "200+ screens and components for iOS and Android app design in Figma.",
      price: 69,
      originalPrice: 99,
      rating: 4.9,
      reviews: 1123,
      category: "templates",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=400&fit=crop&auto=format",
      badge: "Popular",
      downloads: "15.6k",
      author: "Emily Rose"
    },
    {
      id: 10,
      name: "Data Science Bootcamp",
      description: "Comprehensive Python course for data analysis, visualization, and machine learning.",
      price: 129,
      originalPrice: 249,
      rating: 4.8,
      reviews: 678,
      category: "courses",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop&auto=format",
      badge: "Featured",
      downloads: "6.4k",
      author: "James Wilson"
    },
    {
      id: 11,
      name: "Notion Template Bundle",
      description: "50+ Notion templates for productivity, project management, and life organization.",
      price: 29,
      originalPrice: 49,
      rating: 4.6,
      reviews: 445,
      category: "templates",
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=400&fit=crop&auto=format",
      downloads: "11.2k",
      author: "Sarah Miller"
    },
    {
      id: 12,
      name: "Stock Photo Collection",
      description: "1000+ royalty-free stock photos for commercial use. High resolution.",
      price: 49,
      originalPrice: 79,
      rating: 4.5,
      reviews: 289,
      category: "assets",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&h=400&fit=crop&auto=format",
      downloads: "8.9k",
      author: "Emily Rose"
    }
  ];

  const filteredProducts = $derived(
    products.filter(product => {
      if (selectedCategory && product.category !== selectedCategory) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (selectedRating && product.rating < selectedRating) return false;
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "newest": return b.id - a.id;
        default: return b.reviews - a.reviews;
      }
    })
  );

  function clearFilters() {
    selectedCategory = null;
    priceRange = [0, 500];
    selectedRating = null;
    searchQuery = "";
  }
</script>

<svelte:head>
  <title>Products - DigitalVault</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative py-16 lg:py-20 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF610_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF610_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-3xl mx-auto text-center">
      <Badge class="mb-4 bg-primary/10 text-primary border-primary/20">
        <Sparkles class="w-3 h-3 mr-1" />
        {products.length}+ Premium Products
      </Badge>
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        Browse Our
        <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Digital Products
        </span>
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Discover software, templates, courses, ebooks, and digital assets from world-class creators
      </p>

      <!-- Search Bar -->
      <div class="relative max-w-xl mx-auto">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          bind:value={searchQuery}
          class="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      </div>
    </div>
  </div>
</section>

<!-- Products Section -->
<section class="py-12 lg:py-16">
  <div class="container mx-auto px-4">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Filters Sidebar -->
      <aside class="lg:w-64 shrink-0">
        <div class="lg:sticky lg:top-24">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-bold text-lg flex items-center gap-2">
              <SlidersHorizontal class="w-5 h-5" />
              Filters
            </h2>
            <Button variant="ghost" size="sm" onclick={clearFilters}>
              Clear All
            </Button>
          </div>

          <!-- Categories -->
          <div class="mb-6">
            <h3 class="font-semibold mb-3">Categories</h3>
            <div class="space-y-2">
              {#each categories as category}
                <button
                  class="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors {selectedCategory === category.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}"
                  onclick={() => selectedCategory = selectedCategory === category.id ? null : category.id}
                >
                  <div class="flex items-center gap-2">
                    <category.icon class="w-4 h-4" />
                    <span class="text-sm">{category.name}</span>
                  </div>
                  <span class="text-xs text-muted-foreground">{category.count}</span>
                </button>
              {/each}
            </div>
          </div>

          <Separator class="my-6" />

          <!-- Price Range -->
          <div class="mb-6">
            <h3 class="font-semibold mb-3">Price Range</h3>
            <div class="space-y-2">
              {#each [
                { label: "Under $25", range: [0, 25] },
                { label: "$25 - $50", range: [25, 50] },
                { label: "$50 - $100", range: [50, 100] },
                { label: "$100 - $200", range: [100, 200] },
                { label: "$200+", range: [200, 500] }
              ] as price}
                <button
                  class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors {priceRange[0] === price.range[0] && priceRange[1] === price.range[1] ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}"
                  onclick={() => priceRange = price.range as [number, number]}
                >
                  {price.label}
                </button>
              {/each}
            </div>
          </div>

          <Separator class="my-6" />

          <!-- Rating -->
          <div class="mb-6">
            <h3 class="font-semibold mb-3">Minimum Rating</h3>
            <div class="space-y-2">
              {#each [4.5, 4.0, 3.5, 3.0] as rating}
                <button
                  class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors {selectedRating === rating ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}"
                  onclick={() => selectedRating = selectedRating === rating ? null : rating}
                >
                  <div class="flex text-yellow-500">
                    {#each Array(5) as _, i}
                      <Star class="w-3.5 h-3.5 {i < Math.floor(rating) ? 'fill-current' : ''}" />
                    {/each}
                  </div>
                  <span>{rating}+</span>
                </button>
              {/each}
            </div>
          </div>
        </div>
      </aside>

      <!-- Products Grid -->
      <div class="flex-1">
        <!-- Toolbar -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <p class="text-sm text-muted-foreground">
            Showing <span class="font-semibold text-foreground">{filteredProducts.length}</span> products
          </p>
          <div class="flex items-center gap-3">
            <!-- Sort -->
            <Select.Root type="single" bind:value={sortBy}>
              <Select.Trigger class="w-[180px]">
                <ArrowUpDown class="w-4 h-4 mr-2" />
                <Select.Value placeholder="Sort by" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="popular">Most Popular</Select.Item>
                <Select.Item value="newest">Newest</Select.Item>
                <Select.Item value="rating">Highest Rated</Select.Item>
                <Select.Item value="price-low">Price: Low to High</Select.Item>
                <Select.Item value="price-high">Price: High to Low</Select.Item>
              </Select.Content>
            </Select.Root>

            <!-- View Toggle -->
            <div class="flex border border-border rounded-lg">
              <button
                class="p-2 {viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'} rounded-l-lg transition-colors"
                onclick={() => viewMode = 'grid'}
              >
                <Grid class="w-4 h-4" />
              </button>
              <button
                class="p-2 {viewMode === 'list' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'} rounded-r-lg transition-colors"
                onclick={() => viewMode = 'list'}
              >
                <List class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Active Filters -->
        {#if selectedCategory || selectedRating || searchQuery || (priceRange[0] !== 0 || priceRange[1] !== 500)}
          <div class="flex flex-wrap gap-2 mb-6">
            {#if selectedCategory}
              <Badge variant="secondary" class="flex items-center gap-1">
                {categories.find(c => c.id === selectedCategory)?.name}
                <button onclick={() => selectedCategory = null}>
                  <X class="w-3 h-3" />
                </button>
              </Badge>
            {/if}
            {#if selectedRating}
              <Badge variant="secondary" class="flex items-center gap-1">
                {selectedRating}+ Stars
                <button onclick={() => selectedRating = null}>
                  <X class="w-3 h-3" />
                </button>
              </Badge>
            {/if}
            {#if priceRange[0] !== 0 || priceRange[1] !== 500}
              <Badge variant="secondary" class="flex items-center gap-1">
                ${priceRange[0]} - ${priceRange[1]}
                <button onclick={() => priceRange = [0, 500]}>
                  <X class="w-3 h-3" />
                </button>
              </Badge>
            {/if}
            {#if searchQuery}
              <Badge variant="secondary" class="flex items-center gap-1">
                "{searchQuery}"
                <button onclick={() => searchQuery = ""}>
                  <X class="w-3 h-3" />
                </button>
              </Badge>
            {/if}
          </div>
        {/if}

        <!-- Grid View -->
        {#if viewMode === 'grid'}
          <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {#each filteredProducts as product}
              <Card.Root class="group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 bg-card/50 backdrop-blur">
                <div class="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    class="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {#if product.badge}
                    <Badge class="absolute top-3 left-3 bg-gradient-to-r from-primary to-accent text-white border-0">
                      {product.badge}
                    </Badge>
                  {/if}
                  <div class="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                      <Heart class="w-4 h-4 text-foreground" />
                    </button>
                  </div>
                </div>
                <Card.Content class="p-4">
                  <div class="flex items-center gap-2 mb-2">
                    <Badge variant="outline" class="text-xs bg-muted/50 capitalize">{product.category}</Badge>
                    <span class="text-xs text-muted-foreground flex items-center gap-1">
                      <Download class="w-3 h-3" />
                      {product.downloads}
                    </span>
                  </div>
                  <h3 class="font-bold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p class="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <div class="flex items-center gap-1 mb-3">
                    <div class="flex text-yellow-500">
                      {#each Array(5) as _, i}
                        <Star class="w-3.5 h-3.5 {i < Math.floor(product.rating) ? 'fill-current' : ''}" />
                      {/each}
                    </div>
                    <span class="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <span class="text-xl font-bold text-primary">${product.price}</span>
                      <span class="text-sm text-muted-foreground line-through ml-1">${product.originalPrice}</span>
                    </div>
                    <Button size="sm" variant="outline" class="border-primary/30 hover:bg-primary hover:text-white hover:border-primary" href="/products/{product.id}">
                      View Details
                    </Button>
                  </div>
                </Card.Content>
              </Card.Root>
            {/each}
          </div>
        {:else}
          <!-- List View -->
          <div class="space-y-4">
            {#each filteredProducts as product}
              <Card.Root class="group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 bg-card/50 backdrop-blur">
                <div class="flex flex-col md:flex-row">
                  <div class="relative md:w-64 shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      class="w-full h-48 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {#if product.badge}
                      <Badge class="absolute top-3 left-3 bg-gradient-to-r from-primary to-accent text-white border-0">
                        {product.badge}
                      </Badge>
                    {/if}
                  </div>
                  <Card.Content class="flex-1 p-6">
                    <div class="flex items-center gap-2 mb-2">
                      <Badge variant="outline" class="text-xs bg-muted/50 capitalize">{product.category}</Badge>
                      <span class="text-xs text-muted-foreground">by {product.author}</span>
                    </div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p class="text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    <div class="flex items-center gap-4 mb-4">
                      <div class="flex items-center gap-1">
                        <div class="flex text-yellow-500">
                          {#each Array(5) as _, i}
                            <Star class="w-4 h-4 {i < Math.floor(product.rating) ? 'fill-current' : ''}" />
                          {/each}
                        </div>
                        <span class="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                      </div>
                      <span class="text-sm text-muted-foreground flex items-center gap-1">
                        <Download class="w-4 h-4" />
                        {product.downloads} downloads
                      </span>
                    </div>
                    <div class="flex items-center justify-between">
                      <div>
                        <span class="text-2xl font-bold text-primary">${product.price}</span>
                        <span class="text-lg text-muted-foreground line-through ml-2">${product.originalPrice}</span>
                        <span class="text-sm text-success-green ml-2">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                        </span>
                      </div>
                      <div class="flex items-center gap-2">
                        <Button variant="outline" size="icon" class="border-primary/30">
                          <Heart class="w-4 h-4" />
                        </Button>
                        <Button class="bg-gradient-to-r from-primary to-accent text-white border-0" href="/products/{product.id}">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card.Content>
                </div>
              </Card.Root>
            {/each}
          </div>
        {/if}

        <!-- Empty State -->
        {#if filteredProducts.length === 0}
          <div class="text-center py-16">
            <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted/50 flex items-center justify-center">
              <Search class="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 class="text-xl font-bold mb-2">No products found</h3>
            <p class="text-muted-foreground mb-6">
              Try adjusting your filters or search query
            </p>
            <Button onclick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        {/if}

        <!-- Pagination -->
        {#if filteredProducts.length > 0}
          <div class="flex items-center justify-center gap-2 mt-12">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" class="bg-primary/10 text-primary border-primary/30">
              1
            </Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <span class="px-2 text-muted-foreground">...</span>
            <Button variant="outline" size="sm">10</Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
