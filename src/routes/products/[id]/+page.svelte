<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import * as Avatar from "$lib/components/ui/avatar";
  import * as Tabs from "$lib/components/ui/tabs";
  import { Separator } from "$lib/components/ui/separator";
  import {
    Star,
    Download,
    Heart,
    Share2,
    ShoppingCart,
    CheckCircle,
    Shield,
    Clock,
    Users,
    FileText,
    Play,
    Code,
    Zap,
    ArrowRight,
    ChevronRight,
    MessageSquare,
    ThumbsUp,
    AlertCircle
  } from "lucide-svelte";

  import { page } from "$app/stores";

  // Mock product data - in real app would come from API
  const product = {
    id: 2,
    name: "Full-Stack Development Masterclass",
    description: "A comprehensive course covering everything you need to become a full-stack developer. From React and Node.js to PostgreSQL and deployment.",
    longDescription: `This masterclass is designed to take you from beginner to professional full-stack developer. You'll learn modern web development practices used by top tech companies.

The course covers:
- React 18 with hooks, context, and advanced patterns
- Node.js and Express.js for backend development
- PostgreSQL database design and optimization
- Authentication and authorization best practices
- API design and RESTful principles
- Deployment to AWS, Vercel, and Docker
- Testing with Jest and React Testing Library
- Real-world projects and portfolio pieces

Whether you're starting fresh or looking to level up your skills, this course provides a clear path to becoming a confident full-stack developer.`,
    price: 89,
    originalPrice: 199,
    rating: 4.8,
    reviews: 856,
    category: "Courses",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format"
    ],
    badge: "Best Seller",
    downloads: "8.2k",
    author: {
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
      role: "Senior Software Engineer",
      bio: "10+ years of experience building web applications. Former tech lead at Google and Amazon.",
      products: 12,
      sales: "28k",
      rating: 4.9
    },
    features: [
      "40+ hours of video content",
      "Lifetime access",
      "Source code included",
      "Certificate of completion",
      "Community access",
      "14-day money-back guarantee"
    ],
    includes: [
      { icon: Play, text: "40+ hours of video" },
      { icon: FileText, text: "50 downloadable resources" },
      { icon: Code, text: "Full source code" },
      { icon: Users, text: "Community access" },
      { icon: Clock, text: "Lifetime access" },
      { icon: Shield, text: "Certificate included" }
    ],
    requirements: [
      "Basic understanding of HTML and CSS",
      "Familiarity with JavaScript fundamentals",
      "A computer with internet access",
      "Code editor (VS Code recommended)"
    ],
    lastUpdated: "December 2024",
    language: "English",
    level: "Beginner to Advanced"
  };

  const reviews = [
    {
      id: 1,
      author: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
      rating: 5,
      date: "2 weeks ago",
      title: "Best course I've ever taken!",
      content: "David explains complex concepts in such an easy-to-understand way. The projects are practical and I've already used what I learned in my job. Highly recommended!",
      helpful: 42
    },
    {
      id: 2,
      author: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&auto=format",
      rating: 5,
      date: "1 month ago",
      title: "Changed my career",
      content: "I went from being a complete beginner to landing my first developer job in 6 months after completing this course. The community support was invaluable.",
      helpful: 38
    },
    {
      id: 3,
      author: "Ryan Thompson",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&auto=format",
      rating: 4,
      date: "1 month ago",
      title: "Great content, minor issues",
      content: "The content is excellent and very comprehensive. Some of the older videos could use updating, but overall a fantastic course that covers all the essentials.",
      helpful: 24
    }
  ];

  const relatedProducts = [
    {
      id: 3,
      name: "UI Component Library Pro",
      price: 79,
      originalPrice: 129,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop&auto=format"
    },
    {
      id: 5,
      name: "AI Prompt Engineering Guide",
      price: 19,
      originalPrice: 29,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop&auto=format"
    },
    {
      id: 10,
      name: "Data Science Bootcamp",
      price: 129,
      originalPrice: 249,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&auto=format"
    },
    {
      id: 6,
      name: "SaaS Starter Kit",
      price: 149,
      originalPrice: 249,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&auto=format"
    }
  ];

  let selectedImage = $state(0);
  let selectedLicense = $state<"personal" | "commercial">("personal");
</script>

<svelte:head>
  <title>{product.name} - DigitalVault</title>
</svelte:head>

<!-- Breadcrumb -->
<section class="py-4 border-b border-border/50 bg-muted/30">
  <div class="container mx-auto px-4">
    <nav class="flex items-center gap-2 text-sm text-muted-foreground">
      <a href="/" class="hover:text-primary transition-colors">Home</a>
      <ChevronRight class="w-4 h-4" />
      <a href="/products" class="hover:text-primary transition-colors">Products</a>
      <ChevronRight class="w-4 h-4" />
      <a href="/products?category=courses" class="hover:text-primary transition-colors">{product.category}</a>
      <ChevronRight class="w-4 h-4" />
      <span class="text-foreground">{product.name}</span>
    </nav>
  </div>
</section>

<!-- Product Details -->
<section class="py-8 lg:py-12">
  <div class="container mx-auto px-4">
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
      <!-- Product Images -->
      <div>
        <div class="relative rounded-2xl overflow-hidden mb-4 bg-muted">
          <img
            src={product.gallery[selectedImage]}
            alt={product.name}
            class="w-full aspect-video object-cover"
          />
          {#if product.badge}
            <Badge class="absolute top-4 left-4 bg-gradient-to-r from-primary to-accent text-white border-0 text-sm px-3 py-1">
              {product.badge}
            </Badge>
          {/if}
        </div>
        <div class="grid grid-cols-4 gap-3">
          {#each product.gallery as image, index}
            <button
              class="rounded-lg overflow-hidden border-2 transition-all {selectedImage === index ? 'border-primary' : 'border-transparent hover:border-border'}"
              onclick={() => selectedImage = index}
            >
              <img src={image} alt="Product preview {index + 1}" class="w-full aspect-video object-cover" />
            </button>
          {/each}
        </div>
      </div>

      <!-- Product Info -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <Badge variant="outline" class="bg-muted/50">{product.category}</Badge>
          <div class="flex items-center gap-1">
            <div class="flex text-yellow-500">
              {#each Array(5) as _, i}
                <Star class="w-4 h-4 {i < Math.floor(product.rating) ? 'fill-current' : ''}" />
              {/each}
            </div>
            <span class="text-sm font-medium">{product.rating}</span>
            <span class="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>
        </div>

        <h1 class="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>

        <p class="text-lg text-muted-foreground mb-6">{product.description}</p>

        <!-- Author -->
        <div class="flex items-center gap-3 mb-6 p-4 bg-muted/30 rounded-xl">
          <Avatar.Root class="w-12 h-12">
            <Avatar.Image src={product.author.avatar} alt={product.author.name} />
            <Avatar.Fallback>{product.author.name.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
          </Avatar.Root>
          <div>
            <p class="font-semibold">{product.author.name}</p>
            <p class="text-sm text-muted-foreground">{product.author.role}</p>
          </div>
        </div>

        <!-- Pricing -->
        <div class="mb-6">
          <div class="flex items-baseline gap-3 mb-2">
            <span class="text-4xl font-bold text-primary">${product.price}</span>
            <span class="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
            <Badge class="bg-success-green/10 text-success-green border-success-green/20">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </Badge>
          </div>
        </div>

        <!-- License Selection -->
        <div class="mb-6">
          <h3 class="font-semibold mb-3">Choose License:</h3>
          <div class="grid grid-cols-2 gap-3">
            <button
              class="p-4 rounded-xl border-2 text-left transition-all {selectedLicense === 'personal' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}"
              onclick={() => selectedLicense = 'personal'}
            >
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold">Personal</span>
                <span class="font-bold text-primary">${product.price}</span>
              </div>
              <p class="text-sm text-muted-foreground">For personal projects only</p>
            </button>
            <button
              class="p-4 rounded-xl border-2 text-left transition-all {selectedLicense === 'commercial' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}"
              onclick={() => selectedLicense = 'commercial'}
            >
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold">Commercial</span>
                <span class="font-bold text-primary">${Math.round(product.price * 1.5)}</span>
              </div>
              <p class="text-sm text-muted-foreground">For client & business use</p>
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3 mb-6">
          <Button size="lg" class="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 text-white border-0 h-14" href="/cart">
            <ShoppingCart class="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
          <Button size="lg" variant="outline" class="border-primary/30 hover:bg-primary/10 h-14">
            <Heart class="w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" class="border-primary/30 hover:bg-primary/10 h-14">
            <Share2 class="w-5 h-5" />
          </Button>
        </div>

        <!-- Trust Badges -->
        <div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <Shield class="w-4 h-4 text-success-green" />
            <span>Secure Payment</span>
          </div>
          <div class="flex items-center gap-2">
            <Download class="w-4 h-4 text-primary" />
            <span>Instant Download</span>
          </div>
          <div class="flex items-center gap-2">
            <Clock class="w-4 h-4 text-accent" />
            <span>30-Day Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Product Details Tabs -->
<section class="py-12 bg-muted/30">
  <div class="container mx-auto px-4">
    <Tabs.Root value="overview" class="w-full">
      <Tabs.List class="w-full justify-start bg-transparent border-b border-border rounded-none p-0 mb-8">
        <Tabs.Trigger value="overview" class="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
          Overview
        </Tabs.Trigger>
        <Tabs.Trigger value="includes" class="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
          What's Included
        </Tabs.Trigger>
        <Tabs.Trigger value="reviews" class="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
          Reviews ({product.reviews})
        </Tabs.Trigger>
        <Tabs.Trigger value="author" class="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
          About Author
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="overview">
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <h2 class="text-2xl font-bold mb-4">About This Product</h2>
            <div class="prose prose-invert max-w-none">
              {#each product.longDescription.split('\n\n') as paragraph}
                <p class="text-muted-foreground mb-4 whitespace-pre-line">{paragraph}</p>
              {/each}
            </div>
          </div>
          <div>
            <Card.Root class="sticky top-24">
              <Card.Header>
                <Card.Title>Requirements</Card.Title>
              </Card.Header>
              <Card.Content>
                <ul class="space-y-3">
                  {#each product.requirements as req}
                    <li class="flex items-start gap-2 text-sm">
                      <CheckCircle class="w-4 h-4 text-success-green shrink-0 mt-0.5" />
                      <span class="text-muted-foreground">{req}</span>
                    </li>
                  {/each}
                </ul>
                <Separator class="my-4" />
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Last Updated</span>
                    <span>{product.lastUpdated}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Language</span>
                    <span>{product.language}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Level</span>
                    <span>{product.level}</span>
                  </div>
                </div>
              </Card.Content>
            </Card.Root>
          </div>
        </div>
      </Tabs.Content>

      <Tabs.Content value="includes">
        <h2 class="text-2xl font-bold mb-6">What's Included</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each product.includes as item}
            <div class="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <item.icon class="w-6 h-6 text-primary" />
              </div>
              <span class="font-medium">{item.text}</span>
            </div>
          {/each}
        </div>
        <Separator class="my-8" />
        <h3 class="text-xl font-bold mb-4">Key Features</h3>
        <div class="grid md:grid-cols-2 gap-3">
          {#each product.features as feature}
            <div class="flex items-center gap-3">
              <CheckCircle class="w-5 h-5 text-success-green shrink-0" />
              <span>{feature}</span>
            </div>
          {/each}
        </div>
      </Tabs.Content>

      <Tabs.Content value="reviews">
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <h2 class="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div class="space-y-6">
              {#each reviews as review}
                <Card.Root class="bg-card/50">
                  <Card.Content class="pt-6">
                    <div class="flex items-start justify-between mb-4">
                      <div class="flex items-center gap-3">
                        <Avatar.Root class="w-10 h-10">
                          <Avatar.Image src={review.avatar} alt={review.author} />
                          <Avatar.Fallback>{review.author.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
                        </Avatar.Root>
                        <div>
                          <p class="font-semibold">{review.author}</p>
                          <p class="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div class="flex text-yellow-500">
                        {#each Array(5) as _, i}
                          <Star class="w-4 h-4 {i < review.rating ? 'fill-current' : ''}" />
                        {/each}
                      </div>
                    </div>
                    <h4 class="font-semibold mb-2">{review.title}</h4>
                    <p class="text-muted-foreground mb-4">{review.content}</p>
                    <div class="flex items-center gap-4">
                      <button class="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp class="w-4 h-4" />
                        Helpful ({review.helpful})
                      </button>
                      <button class="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <MessageSquare class="w-4 h-4" />
                        Reply
                      </button>
                    </div>
                  </Card.Content>
                </Card.Root>
              {/each}
            </div>
            <div class="text-center mt-8">
              <Button variant="outline" class="border-primary/30">
                Load More Reviews
              </Button>
            </div>
          </div>

          <div>
            <Card.Root class="sticky top-24">
              <Card.Header>
                <Card.Title>Rating Summary</Card.Title>
              </Card.Header>
              <Card.Content>
                <div class="text-center mb-6">
                  <p class="text-5xl font-bold text-primary mb-2">{product.rating}</p>
                  <div class="flex justify-center text-yellow-500 mb-2">
                    {#each Array(5) as _, i}
                      <Star class="w-5 h-5 {i < Math.floor(product.rating) ? 'fill-current' : ''}" />
                    {/each}
                  </div>
                  <p class="text-sm text-muted-foreground">{product.reviews} reviews</p>
                </div>
                <div class="space-y-2">
                  {#each [5, 4, 3, 2, 1] as star}
                    <div class="flex items-center gap-2">
                      <span class="text-sm w-8">{star}</span>
                      <Star class="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          class="h-full bg-yellow-500 rounded-full"
                          style="width: {star === 5 ? '75%' : star === 4 ? '18%' : star === 3 ? '5%' : '2%'}"
                        ></div>
                      </div>
                      <span class="text-sm text-muted-foreground w-10">
                        {star === 5 ? '75%' : star === 4 ? '18%' : star === 3 ? '5%' : '2%'}
                      </span>
                    </div>
                  {/each}
                </div>
              </Card.Content>
            </Card.Root>
          </div>
        </div>
      </Tabs.Content>

      <Tabs.Content value="author">
        <div class="max-w-3xl">
          <h2 class="text-2xl font-bold mb-6">About the Author</h2>
          <Card.Root>
            <Card.Content class="pt-6">
              <div class="flex flex-col md:flex-row gap-6">
                <Avatar.Root class="w-24 h-24 shrink-0">
                  <Avatar.Image src={product.author.avatar} alt={product.author.name} />
                  <Avatar.Fallback>{product.author.name.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
                </Avatar.Root>
                <div>
                  <h3 class="text-xl font-bold mb-1">{product.author.name}</h3>
                  <p class="text-muted-foreground mb-4">{product.author.role}</p>
                  <p class="mb-4">{product.author.bio}</p>
                  <div class="flex items-center gap-6 text-sm">
                    <div>
                      <span class="font-bold text-primary">{product.author.products}</span>
                      <span class="text-muted-foreground ml-1">Products</span>
                    </div>
                    <div>
                      <span class="font-bold text-primary">{product.author.sales}</span>
                      <span class="text-muted-foreground ml-1">Sales</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <Star class="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span class="font-bold text-primary">{product.author.rating}</span>
                      <span class="text-muted-foreground ml-1">Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Content>
            <Card.Footer>
              <Button variant="outline" class="border-primary/30">
                View All Products by {product.author.name.split(' ')[0]}
              </Button>
            </Card.Footer>
          </Card.Root>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  </div>
</section>

<!-- Related Products -->
<section class="py-16">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold">You Might Also Like</h2>
      <Button variant="outline" class="border-primary/30" href="/products">
        View All
        <ArrowRight class="w-4 h-4 ml-2" />
      </Button>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each relatedProducts as product}
        <a href="/products/{product.id}" class="group">
          <Card.Root class="overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 bg-card/50">
            <div class="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                class="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <Card.Content class="p-4">
              <h3 class="font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <div class="flex items-center gap-1 mb-3">
                <div class="flex text-yellow-500">
                  {#each Array(5) as _, i}
                    <Star class="w-3.5 h-3.5 {i < Math.floor(product.rating) ? 'fill-current' : ''}" />
                  {/each}
                </div>
                <span class="text-xs text-muted-foreground">{product.rating}</span>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-lg font-bold text-primary">${product.price}</span>
                  <span class="text-sm text-muted-foreground line-through ml-1">${product.originalPrice}</span>
                </div>
              </div>
            </Card.Content>
          </Card.Root>
        </a>
      {/each}
    </div>
  </div>
</section>
