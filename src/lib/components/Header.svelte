<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Sheet from "$lib/components/ui/sheet";
  import {
    Menu,
    ShoppingCart,
    Download,
    Search,
    User,
    Sparkles,
    Code,
    BookOpen,
    GraduationCap,
    Palette,
    ChevronDown
  } from "lucide-svelte";

  let scrolled = $state(false);

  const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/licensing", label: "Licensing" },
    { href: "/support", label: "Support" }
  ];

  const categories = [
    { href: "/products?category=software", label: "Software", icon: Code },
    { href: "/products?category=templates", label: "Templates", icon: Palette },
    { href: "/products?category=courses", label: "Courses", icon: GraduationCap },
    { href: "/products?category=ebooks", label: "Ebooks", icon: BookOpen },
    { href: "/products?category=assets", label: "Digital Assets", icon: Sparkles }
  ];

  if (typeof window !== 'undefined') {
    $effect(() => {
      const handleScroll = () => {
        scrolled = window.scrollY > 20;
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    });
  }
</script>

<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg shadow-primary/5 border-b border-border/50' : 'bg-transparent'}">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16 lg:h-20">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group">
        <div class="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-cyber-pink flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
          <Download class="w-5 h-5 text-white" />
          <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-accent to-cyber-pink opacity-0 group-hover:opacity-100 blur-lg transition-opacity"></div>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            DigitalVault
          </span>
          <span class="text-[10px] text-muted-foreground -mt-1 hidden sm:block">Premium Digital Products</span>
        </div>
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex items-center gap-1">
        <!-- Products Dropdown -->
        <div class="relative group">
          <button class="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
            Products
            <ChevronDown class="w-4 h-4 transition-transform group-hover:rotate-180" />
          </button>
          <div class="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div class="bg-card border border-border rounded-xl shadow-xl shadow-primary/10 p-2 min-w-[220px]">
              {#each categories as category}
                <a
                  href={category.href}
                  class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors group/item"
                >
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover/item:from-primary/30 group-hover/item:to-accent/30 transition-colors">
                    <category.icon class="w-4 h-4 text-primary" />
                  </div>
                  <span class="font-medium text-sm">{category.label}</span>
                </a>
              {/each}
              <div class="border-t border-border mt-2 pt-2">
                <a
                  href="/products"
                  class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  View All Products
                </a>
              </div>
            </div>
          </div>
        </div>

        {#each navLinks.slice(1) as link}
          <a
            href={link.href}
            class="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
          >
            {link.label}
          </a>
        {/each}
      </nav>

      <!-- Right Actions -->
      <div class="flex items-center gap-2">
        <!-- Search -->
        <Button variant="ghost" size="icon" class="hidden sm:flex hover:bg-primary/10 hover:text-primary">
          <Search class="w-5 h-5" />
        </Button>

        <!-- My Downloads -->
        <Button variant="ghost" size="sm" class="hidden md:flex gap-2 hover:bg-primary/10 hover:text-primary" href="/downloads">
          <Download class="w-4 h-4" />
          <span class="hidden lg:inline">My Downloads</span>
        </Button>

        <!-- Cart -->
        <Button variant="ghost" size="icon" class="relative hover:bg-primary/10 hover:text-primary" href="/cart">
          <ShoppingCart class="w-5 h-5" />
          <span class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
            3
          </span>
        </Button>

        <!-- User Account -->
        <Button variant="ghost" size="icon" class="hidden sm:flex hover:bg-primary/10 hover:text-primary" href="/account">
          <User class="w-5 h-5" />
        </Button>

        <!-- CTA Button -->
        <Button class="hidden md:flex bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 text-white border-0" href="/products">
          Browse Products
        </Button>

        <!-- Mobile Menu -->
        <div class="lg:hidden">
          <Sheet.Root>
            <Sheet.Trigger>
              {#snippet child({ props })}
                <Button {...props} variant="ghost" size="icon" class="hover:bg-primary/10 hover:text-primary">
                  <Menu class="h-6 w-6" />
                </Button>
              {/snippet}
            </Sheet.Trigger>
            <Sheet.Content side="right" class="w-[300px] bg-background/95 backdrop-blur-xl border-l border-border/50">
              <Sheet.Header>
                <Sheet.Title class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Download class="w-4 h-4 text-white" />
                  </div>
                  <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                    DigitalVault
                  </span>
                </Sheet.Title>
              </Sheet.Header>
              <div class="mt-8 flex flex-col gap-2">
                <!-- Search in mobile -->
                <div class="relative mb-4">
                  <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    class="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <!-- Categories -->
                <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Categories</p>
                {#each categories as category}
                  <a
                    href={category.href}
                    class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <category.icon class="w-4 h-4 text-primary" />
                    </div>
                    <span class="font-medium">{category.label}</span>
                  </a>
                {/each}

                <div class="border-t border-border my-4"></div>

                <!-- Quick Links -->
                <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Quick Links</p>
                {#each navLinks as link}
                  <a
                    href={link.href}
                    class="px-3 py-2 font-medium hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                  >
                    {link.label}
                  </a>
                {/each}
                <a
                  href="/downloads"
                  class="flex items-center gap-2 px-3 py-2 font-medium hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                >
                  <Download class="w-4 h-4" />
                  My Downloads
                </a>

                <div class="border-t border-border my-4"></div>

                <!-- CTA -->
                <Button class="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 text-white border-0" href="/products">
                  Browse All Products
                </Button>
              </div>
            </Sheet.Content>
          </Sheet.Root>
        </div>
      </div>
    </div>
  </div>
</header>

<!-- Spacer for fixed header -->
<div class="h-16 lg:h-20"></div>
