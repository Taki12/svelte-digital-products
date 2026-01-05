<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Separator } from "$lib/components/ui/separator";
  import {
    ArrowRight,
    Download,
    Zap,
    Shield,
    Star,
    Code,
    BookOpen,
    GraduationCap,
    Palette,
    Sparkles,
    Play,
    CheckCircle,
    TrendingUp,
    Clock,
    Users,
    Award,
    RefreshCw,
    Heart,
    ShoppingCart
  } from "lucide-svelte";

  const categories = [
    {
      id: "software",
      name: "Software",
      description: "Apps, plugins & tools",
      icon: Code,
      count: 234,
      color: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&auto=format"
    },
    {
      id: "templates",
      name: "Templates",
      description: "Design & code templates",
      icon: Palette,
      count: 456,
      color: "from-pink-500 to-rose-500",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&auto=format"
    },
    {
      id: "courses",
      name: "Courses",
      description: "Video tutorials & classes",
      icon: GraduationCap,
      count: 128,
      color: "from-purple-500 to-violet-500",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format"
    },
    {
      id: "ebooks",
      name: "Ebooks",
      description: "Guides & documentation",
      icon: BookOpen,
      count: 312,
      color: "from-amber-500 to-orange-500",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop&auto=format"
    },
    {
      id: "assets",
      name: "Digital Assets",
      description: "Icons, graphics & more",
      icon: Sparkles,
      count: 892,
      color: "from-emerald-500 to-teal-500",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop&auto=format"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "ProCode IDE Theme Bundle",
      description: "50+ stunning themes for VS Code, JetBrains, and more",
      price: 29,
      originalPrice: 49,
      rating: 4.9,
      reviews: 1284,
      category: "Software",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=400&fit=crop&auto=format",
      badge: "Best Seller",
      downloads: "12.5k"
    },
    {
      id: 2,
      name: "Full-Stack Development Masterclass",
      description: "Complete course with React, Node.js, and PostgreSQL",
      price: 89,
      originalPrice: 199,
      rating: 4.8,
      reviews: 856,
      category: "Courses",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop&auto=format",
      badge: "Featured",
      downloads: "8.2k"
    },
    {
      id: 3,
      name: "UI Component Library Pro",
      description: "500+ customizable React & Vue components",
      price: 79,
      originalPrice: 129,
      rating: 4.9,
      reviews: 2341,
      category: "Templates",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=400&fit=crop&auto=format",
      badge: "Top Rated",
      downloads: "25.8k"
    },
    {
      id: 4,
      name: "Design Systems Handbook",
      description: "Complete guide to building scalable design systems",
      price: 24,
      originalPrice: 39,
      rating: 4.7,
      reviews: 567,
      category: "Ebooks",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&h=400&fit=crop&auto=format",
      badge: "New",
      downloads: "5.1k"
    }
  ];

  const trendingProducts = [
    {
      id: 5,
      name: "AI Prompt Engineering Guide",
      price: 19,
      rating: 4.8,
      category: "Ebooks",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop&auto=format"
    },
    {
      id: 6,
      name: "SaaS Starter Kit",
      price: 149,
      rating: 4.9,
      category: "Templates",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&auto=format"
    },
    {
      id: 7,
      name: "3D Icon Pack Pro",
      price: 39,
      rating: 4.7,
      category: "Assets",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop&auto=format"
    },
    {
      id: 8,
      name: "DevOps Automation Scripts",
      price: 59,
      rating: 4.8,
      category: "Software",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=300&h=200&fit=crop&auto=format"
    },
    {
      id: 9,
      name: "Mobile App UI Kit",
      price: 69,
      rating: 4.9,
      category: "Templates",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop&auto=format"
    },
    {
      id: 10,
      name: "Data Science Bootcamp",
      price: 129,
      rating: 4.8,
      category: "Courses",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&auto=format"
    }
  ];

  const creators = [
    {
      name: "Alex Chen",
      role: "Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format",
      products: 24,
      sales: "45k",
      rating: 4.9
    },
    {
      name: "Sarah Miller",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
      products: 18,
      sales: "32k",
      rating: 4.8
    },
    {
      name: "David Park",
      role: "Course Creator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
      products: 12,
      sales: "28k",
      rating: 4.9
    },
    {
      name: "Emily Rose",
      role: "Digital Artist",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format",
      products: 56,
      sales: "67k",
      rating: 4.7
    }
  ];

  const testimonials = [
    {
      quote: "The UI component library saved me weeks of development time. Best investment I've made for my startup.",
      author: "James Wilson",
      role: "Founder at TechFlow",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
      product: "UI Component Library Pro"
    },
    {
      quote: "The course content is incredibly well-structured. I went from beginner to landing my first dev job in 6 months!",
      author: "Maria Garcia",
      role: "Junior Developer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&auto=format",
      product: "Full-Stack Development Masterclass"
    },
    {
      quote: "These templates are production-ready out of the box. The attention to detail is remarkable.",
      author: "Ryan Thompson",
      role: "Lead Designer at Pixela",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&auto=format",
      product: "SaaS Starter Kit"
    }
  ];

  const stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "2,500+", label: "Digital Products" },
    { value: "500+", label: "Expert Creators" },
    { value: "4.8", label: "Average Rating" }
  ];
</script>

<!-- Hero Section -->
<section class="relative min-h-[90vh] flex items-center overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10"></div>
  <div class="absolute inset-0">
    <div class="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-pink/10 rounded-full blur-3xl"></div>
  </div>

  <!-- Grid Pattern Overlay -->
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF610_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF610_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <!-- Left Content -->
      <div class="text-center lg:text-left">
        <Badge class="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
          <Sparkles class="w-3 h-3 mr-1" />
          Over 2,500 Premium Products
        </Badge>

        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Your Gateway to
          <span class="bg-gradient-to-r from-primary via-accent to-cyber-pink bg-clip-text text-transparent">
            Premium Digital Products
          </span>
        </h1>

        <p class="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
          Discover software, templates, courses, ebooks, and digital assets from world-class creators. Instant downloads with lifetime access.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
          <Button size="lg" class="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl shadow-primary/30 text-white border-0 text-lg h-14 px-8" href="/products">
            Browse Products
            <ArrowRight class="w-5 h-5 ml-2" />
          </Button>
          <Button size="lg" variant="outline" class="h-14 px-8 border-primary/30 hover:bg-primary/10 hover:border-primary/50" href="/creators">
            <Play class="w-5 h-5 mr-2" />
            Become a Creator
          </Button>
        </div>

        <!-- Trust Indicators -->
        <div class="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <CheckCircle class="w-5 h-5 text-success-green" />
            <span>Instant Download</span>
          </div>
          <div class="flex items-center gap-2">
            <Shield class="w-5 h-5 text-primary" />
            <span>Secure Payment</span>
          </div>
          <div class="flex items-center gap-2">
            <RefreshCw class="w-5 h-5 text-accent" />
            <span>30-Day Guarantee</span>
          </div>
        </div>
      </div>

      <!-- Right Content - Featured Products Preview -->
      <div class="relative hidden lg:block">
        <div class="relative">
          <!-- Main Card -->
          <div class="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl shadow-primary/10">
            <div class="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </div>
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop&auto=format"
              alt="Featured product"
              class="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 class="font-bold text-lg mb-2">Full-Stack Development Masterclass</h3>
            <div class="flex items-center gap-2 mb-3">
              <div class="flex text-yellow-500">
                {#each Array(5) as _}
                  <Star class="w-4 h-4 fill-current" />
                {/each}
              </div>
              <span class="text-sm text-muted-foreground">(856 reviews)</span>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-2xl font-bold text-primary">$89</span>
                <span class="text-sm text-muted-foreground line-through ml-2">$199</span>
              </div>
              <Button size="sm" class="bg-gradient-to-r from-primary to-accent text-white border-0">
                <ShoppingCart class="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>

          <!-- Floating Cards -->
          <div class="absolute -left-16 top-20 bg-card/90 backdrop-blur-xl border border-border/50 rounded-xl p-4 shadow-xl animate-float">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Download class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="font-semibold text-sm">Instant Access</p>
                <p class="text-xs text-muted-foreground">Download immediately</p>
              </div>
            </div>
          </div>

          <div class="absolute -right-12 bottom-24 bg-card/90 backdrop-blur-xl border border-border/50 rounded-xl p-4 shadow-xl animate-float" style="animation-delay: 0.5s;">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Users class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="font-semibold text-sm">50K+ Customers</p>
                <p class="text-xs text-muted-foreground">Trust our marketplace</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-border/50">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      {#each stats as stat}
        <div class="text-center">
          <p class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {stat.value}
          </p>
          <p class="text-sm text-muted-foreground mt-1">{stat.label}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Categories Section -->
<section class="py-20 lg:py-28">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <Badge class="mb-4 bg-accent/10 text-accent border-accent/20">
        Shop By Category
      </Badge>
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        Find What You Need
      </h2>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Browse our curated collection of digital products across multiple categories
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
      {#each categories as category}
        <a
          href="/products?category={category.id}"
          class="group relative overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-[3/4]"
        >
          <img
            src={category.image}
            alt={category.name}
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div class="absolute inset-0 p-6 flex flex-col justify-end">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br {category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
              <category.icon class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mb-1">{category.name}</h3>
            <p class="text-sm text-white/70">{category.description}</p>
            <p class="text-xs text-white/50 mt-2">{category.count} products</p>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- Featured Products Section -->
<section class="py-20 lg:py-28 bg-gradient-to-b from-muted/30 to-background">
  <div class="container mx-auto px-4">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
      <div>
        <Badge class="mb-4 bg-primary/10 text-primary border-primary/20">
          <Star class="w-3 h-3 mr-1 fill-primary" />
          Featured Products
        </Badge>
        <h2 class="text-3xl md:text-4xl font-bold mb-2">
          Top-Rated Products
        </h2>
        <p class="text-muted-foreground">
          Hand-picked selections loved by thousands of customers
        </p>
      </div>
      <Button variant="outline" class="border-primary/30 hover:bg-primary/10" href="/products">
        View All Products
        <ArrowRight class="w-4 h-4 ml-2" />
      </Button>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each featuredProducts as product}
        <Card.Root class="group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 bg-card/50 backdrop-blur">
          <div class="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              class="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <Badge class="absolute top-3 left-3 bg-gradient-to-r from-primary to-accent text-white border-0">
              {product.badge}
            </Badge>
            <div class="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                <Heart class="w-4 h-4 text-foreground" />
              </button>
            </div>
            <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <Card.Content class="p-4">
            <div class="flex items-center gap-2 mb-2">
              <Badge variant="outline" class="text-xs bg-muted/50">{product.category}</Badge>
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
  </div>
</section>

<!-- Trending Products Section -->
<section class="py-20 lg:py-28">
  <div class="container mx-auto px-4">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
      <div>
        <Badge class="mb-4 bg-accent/10 text-accent border-accent/20">
          <TrendingUp class="w-3 h-3 mr-1" />
          Trending Now
        </Badge>
        <h2 class="text-3xl md:text-4xl font-bold mb-2">
          What's Hot This Week
        </h2>
        <p class="text-muted-foreground">
          Discover what other creators and developers are buying
        </p>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {#each trendingProducts as product}
        <a href="/products/{product.id}" class="group">
          <div class="relative overflow-hidden rounded-xl aspect-square mb-3">
            <img
              src={product.image}
              alt={product.name}
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <h4 class="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
            {product.name}
          </h4>
          <div class="flex items-center justify-between">
            <span class="font-bold text-primary">${product.price}</span>
            <div class="flex items-center gap-1 text-xs text-muted-foreground">
              <Star class="w-3 h-3 text-yellow-500 fill-yellow-500" />
              {product.rating}
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- Instant Download Highlight -->
<section class="py-20 lg:py-28 bg-gradient-to-r from-primary/10 via-accent/10 to-cyber-pink/10">
  <div class="container mx-auto px-4">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <Badge class="mb-4 bg-white/10 text-white border-white/20 backdrop-blur">
          <Zap class="w-3 h-3 mr-1" />
          Instant Access
        </Badge>
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Download Instantly, Create Immediately
        </h2>
        <p class="text-lg text-muted-foreground mb-8">
          No waiting, no delays. Get instant access to your purchased products and start creating right away. All files are delivered directly to your account.
        </p>

        <div class="space-y-4 mb-8">
          {#each [
            { icon: Download, title: "Immediate File Access", desc: "Download files seconds after purchase" },
            { icon: Clock, title: "Lifetime Updates", desc: "Get all future updates for free" },
            { icon: Shield, title: "License Included", desc: "Clear commercial license with every purchase" }
          ] as feature}
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                <feature.icon class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 class="font-semibold">{feature.title}</h4>
                <p class="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          {/each}
        </div>

        <Button size="lg" class="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl shadow-primary/25 text-white border-0" href="/products">
          Start Shopping
          <ArrowRight class="w-5 h-5 ml-2" />
        </Button>
      </div>

      <div class="relative">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=500&fit=crop&auto=format"
          alt="Instant download"
          class="rounded-2xl shadow-2xl shadow-primary/20"
        />
        <div class="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-xl border border-border rounded-xl p-4 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-success-green to-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle class="w-6 h-6 text-white" />
            </div>
            <div>
              <p class="font-bold text-lg">Download Ready!</p>
              <p class="text-sm text-muted-foreground">Your files are available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Licensing Options Section -->
<section class="py-20 lg:py-28">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <Badge class="mb-4 bg-primary/10 text-primary border-primary/20">
        <Shield class="w-3 h-3 mr-1" />
        Licensing Made Simple
      </Badge>
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        Clear Licensing for Every Need
      </h2>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Choose the right license for your project. From personal use to enterprise deployment.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {#each [
        {
          name: "Personal",
          price: "Included",
          description: "For personal projects and learning",
          features: ["Single user license", "Personal projects only", "No commercial use", "Community support"],
          highlight: false
        },
        {
          name: "Commercial",
          price: "+50%",
          description: "For client work and businesses",
          features: ["Unlimited projects", "Commercial use allowed", "Client projects", "Priority support", "Extended updates"],
          highlight: true
        },
        {
          name: "Extended",
          price: "Contact Us",
          description: "For enterprise and distribution",
          features: ["Unlimited users", "Redistribution rights", "SaaS deployment", "White-label options", "Dedicated support"],
          highlight: false
        }
      ] as license}
        <Card.Root class="relative overflow-hidden {license.highlight ? 'border-primary shadow-xl shadow-primary/20' : 'border-border/50'}">
          {#if license.highlight}
            <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-accent"></div>
          {/if}
          <Card.Header class="text-center">
            <Card.Title class="text-xl">{license.name}</Card.Title>
            <p class="text-2xl font-bold text-primary mt-2">{license.price}</p>
            <Card.Description>{license.description}</Card.Description>
          </Card.Header>
          <Card.Content>
            <ul class="space-y-3">
              {#each license.features as feature}
                <li class="flex items-center gap-2 text-sm">
                  <CheckCircle class="w-4 h-4 text-success-green shrink-0" />
                  {feature}
                </li>
              {/each}
            </ul>
          </Card.Content>
          <Card.Footer>
            <Button class="w-full {license.highlight ? 'bg-gradient-to-r from-primary to-accent text-white border-0' : ''}" variant={license.highlight ? 'default' : 'outline'} href="/licensing">
              Learn More
            </Button>
          </Card.Footer>
        </Card.Root>
      {/each}
    </div>
  </div>
</section>

<!-- Customer Success Stories -->
<section class="py-20 lg:py-28 bg-gradient-to-b from-muted/30 to-background">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <Badge class="mb-4 bg-accent/10 text-accent border-accent/20">
        <Star class="w-3 h-3 mr-1 fill-accent" />
        Customer Stories
      </Badge>
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        Loved by Thousands of Creators
      </h2>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        See what our customers have to say about their experience
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {#each testimonials as testimonial}
        <Card.Root class="bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all">
          <Card.Content class="pt-6">
            <div class="flex text-yellow-500 mb-4">
              {#each Array(5) as _}
                <Star class="w-4 h-4 fill-current" />
              {/each}
            </div>
            <p class="text-muted-foreground italic mb-6">
              "{testimonial.quote}"
            </p>
            <Separator class="mb-4" />
            <div class="flex items-center gap-3">
              <Avatar.Root class="w-10 h-10">
                <Avatar.Image src={testimonial.avatar} alt={testimonial.author} />
                <Avatar.Fallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
              </Avatar.Root>
              <div>
                <p class="font-semibold text-sm">{testimonial.author}</p>
                <p class="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
            <Badge variant="outline" class="mt-3 text-xs bg-muted/50">
              Purchased: {testimonial.product}
            </Badge>
          </Card.Content>
        </Card.Root>
      {/each}
    </div>
  </div>
</section>

<!-- Money-Back Guarantee Section -->
<section class="py-20 lg:py-28">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto text-center">
      <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-success-green/20 to-emerald-500/20 flex items-center justify-center">
        <Shield class="w-10 h-10 text-success-green" />
      </div>
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        30-Day Money-Back Guarantee
      </h2>
      <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Not satisfied with your purchase? No problem. We offer a full refund within 30 days, no questions asked. Your satisfaction is our priority.
      </p>
      <div class="flex flex-wrap justify-center gap-8 mb-8">
        {#each [
          { icon: CheckCircle, text: "Full Refund" },
          { icon: Clock, text: "30-Day Window" },
          { icon: Heart, text: "No Questions Asked" }
        ] as item}
          <div class="flex items-center gap-2 text-muted-foreground">
            <item.icon class="w-5 h-5 text-success-green" />
            <span>{item.text}</span>
          </div>
        {/each}
      </div>
      <Button size="lg" class="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl shadow-primary/25 text-white border-0" href="/products">
        Shop with Confidence
        <ArrowRight class="w-5 h-5 ml-2" />
      </Button>
    </div>
  </div>
</section>

<!-- Creator Spotlights Section -->
<section class="py-20 lg:py-28 bg-gradient-to-b from-muted/30 to-background">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <Badge class="mb-4 bg-cyber-pink/10 text-cyber-pink border-cyber-pink/20">
        <Award class="w-3 h-3 mr-1" />
        Top Creators
      </Badge>
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        Meet Our Featured Creators
      </h2>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Learn from the best. Our creators are industry experts sharing their knowledge and tools.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each creators as creator}
        <Card.Root class="group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 bg-card/50 backdrop-blur text-center">
          <Card.Content class="pt-6">
            <Avatar.Root class="w-20 h-20 mx-auto mb-4 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
              <Avatar.Image src={creator.avatar} alt={creator.name} />
              <Avatar.Fallback>{creator.name.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
            </Avatar.Root>
            <h3 class="font-bold text-lg">{creator.name}</h3>
            <p class="text-sm text-muted-foreground mb-4">{creator.role}</p>
            <div class="grid grid-cols-3 gap-2 text-center">
              <div>
                <p class="font-bold text-primary">{creator.products}</p>
                <p class="text-xs text-muted-foreground">Products</p>
              </div>
              <div>
                <p class="font-bold text-primary">{creator.sales}</p>
                <p class="text-xs text-muted-foreground">Sales</p>
              </div>
              <div>
                <p class="font-bold text-primary">{creator.rating}</p>
                <p class="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </Card.Content>
          <Card.Footer class="justify-center">
            <Button variant="outline" size="sm" class="border-primary/30 hover:bg-primary/10">
              View Products
            </Button>
          </Card.Footer>
        </Card.Root>
      {/each}
    </div>

    <div class="text-center mt-10">
      <Button variant="outline" class="border-primary/30 hover:bg-primary/10" href="/creators">
        View All Creators
        <ArrowRight class="w-4 h-4 ml-2" />
      </Button>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-20 lg:py-28 bg-gradient-to-r from-primary via-accent to-cyber-pink">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
      Ready to Create Something Amazing?
    </h2>
    <p class="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
      Join over 50,000 creators and developers who trust DigitalVault for their digital product needs.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button size="lg" class="bg-white text-primary hover:bg-white/90 shadow-xl border-0 h-14 px-8" href="/products">
        Browse Products
        <ArrowRight class="w-5 h-5 ml-2" />
      </Button>
      <Button size="lg" variant="outline" class="border-white/30 text-white hover:bg-white/10 h-14 px-8" href="/creators">
        Become a Creator
      </Button>
    </div>
  </div>
</section>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
</style>
