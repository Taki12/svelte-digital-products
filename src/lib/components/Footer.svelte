<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import {
    Download,
    Mail,
    Twitter,
    Github,
    Linkedin,
    Youtube,
    CreditCard,
    Shield,
    Zap,
    HeadphonesIcon,
    ArrowRight
  } from "lucide-svelte";

  const productCategories = [
    { href: "/products?category=software", label: "Software" },
    { href: "/products?category=templates", label: "Templates" },
    { href: "/products?category=courses", label: "Online Courses" },
    { href: "/products?category=ebooks", label: "Ebooks & Guides" },
    { href: "/products?category=assets", label: "Digital Assets" }
  ];

  const supportLinks = [
    { href: "/support", label: "Help Center" },
    { href: "/support#faq", label: "FAQ" },
    { href: "/downloads", label: "My Downloads" },
    { href: "/licensing", label: "Licensing Info" },
    { href: "/support#refunds", label: "Refund Policy" }
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/creators", label: "For Creators" },
    { href: "/affiliate", label: "Affiliate Program" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" }
  ];

  const legalLinks = [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cookies", label: "Cookie Policy" }
  ];

  const socialLinks = [
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Github, label: "GitHub" },
    { href: "#", icon: Linkedin, label: "LinkedIn" },
    { href: "#", icon: Youtube, label: "YouTube" }
  ];

  const features = [
    { icon: Zap, title: "Instant Download", description: "Get your files immediately after purchase" },
    { icon: Shield, title: "Secure Payments", description: "256-bit SSL encrypted transactions" },
    { icon: HeadphonesIcon, title: "24/7 Support", description: "We're here to help anytime" },
    { icon: CreditCard, title: "Money-Back Guarantee", description: "30-day no questions asked" }
  ];
</script>

<footer class="bg-gradient-to-b from-background to-muted/30 border-t border-border">
  <!-- Features Bar -->
  <div class="border-b border-border/50">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        {#each features as feature}
          <div class="flex items-start gap-3 group">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
              <feature.icon class="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 class="font-semibold text-sm">{feature.title}</h4>
              <p class="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Newsletter Section -->
  <div class="border-b border-border/50 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-2xl mx-auto text-center">
        <h3 class="text-2xl font-bold mb-2">
          Get exclusive deals & updates
        </h3>
        <p class="text-muted-foreground mb-6">
          Subscribe to our newsletter for special offers, new product releases, and digital tips.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div class="relative flex-1">
            <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              placeholder="Enter your email"
              class="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <Button class="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 text-white border-0 px-6">
            Subscribe
            <ArrowRight class="w-4 h-4 ml-2" />
          </Button>
        </div>
        <p class="text-xs text-muted-foreground mt-3">
          No spam, unsubscribe at any time.
        </p>
      </div>
    </div>
  </div>

  <!-- Main Footer Content -->
  <div class="container mx-auto px-4 py-12 lg:py-16">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
      <!-- Brand Column -->
      <div class="col-span-2 md:col-span-3 lg:col-span-1">
        <a href="/" class="flex items-center gap-2 mb-4 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-cyber-pink flex items-center justify-center shadow-lg shadow-primary/25">
            <Download class="w-5 h-5 text-white" />
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DigitalVault
            </span>
          </div>
        </a>
        <p class="text-sm text-muted-foreground mb-6 max-w-xs">
          Your trusted marketplace for premium digital products. Software, templates, courses, and more from top creators worldwide.
        </p>
        <div class="flex items-center gap-2">
          {#each socialLinks as social}
            <a
              href={social.href}
              class="w-9 h-9 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors group"
              aria-label={social.label}
            >
              <social.icon class="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          {/each}
        </div>
      </div>

      <!-- Products -->
      <div>
        <h4 class="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground/80">Products</h4>
        <ul class="space-y-3">
          {#each productCategories as link}
            <li>
              <a
                href={link.href}
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Support -->
      <div>
        <h4 class="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground/80">Support</h4>
        <ul class="space-y-3">
          {#each supportLinks as link}
            <li>
              <a
                href={link.href}
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h4 class="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground/80">Company</h4>
        <ul class="space-y-3">
          {#each companyLinks as link}
            <li>
              <a
                href={link.href}
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <h4 class="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground/80">Legal</h4>
        <ul class="space-y-3">
          {#each legalLinks as link}
            <li>
              <a
                href={link.href}
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <!-- Bottom Bar -->
  <div class="border-t border-border/50">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} DigitalVault. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=120&h=30&fit=crop&auto=format" alt="Payment methods" class="h-6 opacity-70 rounded" />
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield class="w-4 h-4" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
