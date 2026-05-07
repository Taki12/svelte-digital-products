<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import * as Accordion from "$lib/components/ui/accordion";
  import { Separator } from "$lib/components/ui/separator";
  import * as Tabs from "$lib/components/ui/tabs";
  import {
    HelpCircle,
    MessageCircle,
    Mail,
    Phone,
    Search,
    BookOpen,
    Download,
    CreditCard,
    Shield,
    RefreshCw,
    FileText,
    Video,
    ArrowRight,
    ChevronRight,
    Clock,
    CheckCircle,
    Zap,
    Users,
    AlertCircle,
    ExternalLink
  } from "lucide-svelte";

  let searchQuery = $state("");
  let selectedCategory = $state("all");

  const categories = [
    { id: "all", name: "All Topics", icon: HelpCircle },
    { id: "downloads", name: "Downloads", icon: Download },
    { id: "payments", name: "Payments", icon: CreditCard },
    { id: "licensing", name: "Licensing", icon: Shield },
    { id: "refunds", name: "Refunds", icon: RefreshCw }
  ];

  const faqs = [
    {
      category: "downloads",
      question: "How do I download my purchased products?",
      answer: "After purchase, your products are immediately available in the 'My Downloads' section. Click on 'Download' next to any file to save it to your device. You can re-download your purchases anytime."
    },
    {
      category: "downloads",
      question: "Why is my download failing?",
      answer: "Download issues are usually caused by slow internet connections or browser issues. Try: 1) Using a different browser, 2) Disabling browser extensions, 3) Checking your internet connection, 4) Using a download manager for large files."
    },
    {
      category: "downloads",
      question: "How do I access product updates?",
      answer: "When a product is updated, you'll see an 'Update Available' badge in your downloads. Click to download the latest version. All updates are free with your purchase."
    },
    {
      category: "payments",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. For enterprise purchases, we also offer bank transfers and invoicing."
    },
    {
      category: "payments",
      question: "Is my payment information secure?",
      answer: "Absolutely. We use industry-standard 256-bit SSL encryption and partner with Stripe for payment processing. We never store your full card details on our servers."
    },
    {
      category: "payments",
      question: "Can I get an invoice for my purchase?",
      answer: "Yes! Invoices are automatically sent to your email after purchase. You can also download invoices from your account settings under 'Purchase History'."
    },
    {
      category: "licensing",
      question: "What's included in a Personal license?",
      answer: "A Personal license covers single-user, non-commercial use. It's perfect for portfolio projects, learning, and personal websites. Commercial use requires a Commercial license."
    },
    {
      category: "licensing",
      question: "Can I upgrade my license later?",
      answer: "Yes! You can upgrade from Personal to Commercial or Extended at any time. You'll only pay the difference. Contact support or use the license upgrade feature in your account."
    },
    {
      category: "licensing",
      question: "Do I need multiple licenses for team use?",
      answer: "Personal and Commercial licenses are for single users. For teams, either each member needs their own license, or you can purchase an Extended license which includes unlimited users."
    },
    {
      category: "refunds",
      question: "What is your refund policy?",
      answer: "We offer a 30-day money-back guarantee on all products. If you're not satisfied for any reason, contact support within 30 days of purchase for a full refund."
    },
    {
      category: "refunds",
      question: "How long does a refund take?",
      answer: "Refunds are typically processed within 3-5 business days. The funds may take an additional 5-10 days to appear on your statement depending on your bank."
    },
    {
      category: "refunds",
      question: "Are there any conditions for refunds?",
      answer: "We offer refunds within 30 days of purchase, no questions asked. However, we may ask for brief feedback to help us improve our products."
    }
  ];

  const filteredFaqs = $derived(
    faqs.filter(faq => {
      if (selectedCategory !== "all" && faq.category !== selectedCategory) return false;
      if (searchQuery && !faq.question.toLowerCase().includes(searchQuery.toLowerCase()) && !faq.answer.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
  );

  const supportChannels = [
    {
      title: "Help Center",
      description: "Browse our comprehensive documentation and guides",
      icon: BookOpen,
      action: "Browse Docs",
      href: "#docs",
      available: "24/7"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      action: "Start Chat",
      href: "#chat",
      available: "Mon-Fri, 9am-6pm EST"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      action: "Send Email",
      href: "mailto:support@digitalvault.com",
      available: "Response within 24 hours"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: Video,
      action: "Watch Videos",
      href: "#videos",
      available: "100+ tutorials"
    }
  ];

  const popularArticles = [
    { title: "Getting Started Guide", category: "Basics", reads: "15.2k", slug: "getting-started" },
    { title: "How to Download Products", category: "Downloads", reads: "12.8k", slug: "how-to-download" },
    { title: "Understanding License Types", category: "Licensing", reads: "9.5k", slug: "license-types" },
    { title: "Requesting a Refund", category: "Refunds", reads: "8.1k", slug: "requesting-refund" },
    { title: "Upgrading Your License", category: "Licensing", reads: "6.7k", slug: "upgrade-license" },
    { title: "Payment Methods & Security", category: "Payments", reads: "5.3k", slug: "payment-security" }
  ];
</script>

<svelte:head>
  <title>Support - DigitalVault</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative py-16 lg:py-24 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF610_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF610_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-3xl mx-auto text-center">
      <Badge class="mb-4 bg-primary/10 text-primary border-primary/20">
        <HelpCircle class="w-3 h-3 mr-1" />
        Help & Support
      </Badge>
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        How Can We
        <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Help You?
        </span>
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Find answers, get support, and learn how to make the most of your digital products
      </p>

      <!-- Search Bar -->
      <div class="relative max-w-xl mx-auto">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for help..."
          bind:value={searchQuery}
          class="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      </div>
    </div>
  </div>
</section>

<!-- Support Channels -->
<section class="py-12 lg:py-16">
  <div class="container mx-auto px-4">
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each supportChannels as channel}
        <Card.Root class="group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 bg-card/50 backdrop-blur">
          <Card.Content class="pt-6">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
              <channel.icon class="w-6 h-6 text-primary" />
            </div>
            <h3 class="font-bold text-lg mb-2">{channel.title}</h3>
            <p class="text-sm text-muted-foreground mb-4">{channel.description}</p>
            <div class="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <Clock class="w-3 h-3" />
              {channel.available}
            </div>
            <Button variant="outline" class="w-full border-primary/30 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all" href={channel.href}>
              {channel.action}
              <ArrowRight class="w-4 h-4 ml-2" />
            </Button>
          </Card.Content>
        </Card.Root>
      {/each}
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section class="py-12 lg:py-16 bg-muted/30" id="faq">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Quick answers to common questions
      </p>
    </div>

    <!-- Category Filters -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      {#each categories as category}
        <Button
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onclick={() => selectedCategory = category.id}
          class={selectedCategory === category.id ? "bg-gradient-to-r from-primary to-accent text-white border-0" : "border-primary/30"}
        >
          <category.icon class="w-4 h-4 mr-1" />
          {category.name}
        </Button>
      {/each}
    </div>

    <div class="max-w-3xl mx-auto">
      {#if filteredFaqs.length > 0}
        <Accordion.Root type="single" class="w-full">
          {#each filteredFaqs as faq, index}
            <Accordion.Item value="item-{index}" class="border-b border-border/50">
              <Accordion.Trigger class="hover:no-underline py-4">
                <div class="flex items-start gap-3 text-left">
                  <HelpCircle class="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span class="font-medium">{faq.question}</span>
                </div>
              </Accordion.Trigger>
              <Accordion.Content>
                <p class="text-muted-foreground pb-4 pl-8">{faq.answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          {/each}
        </Accordion.Root>
      {:else}
        <div class="text-center py-12">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/50 flex items-center justify-center">
            <Search class="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 class="text-lg font-bold mb-2">No results found</h3>
          <p class="text-muted-foreground mb-4">
            Try adjusting your search or filter
          </p>
          <Button variant="outline" onclick={() => { searchQuery = ""; selectedCategory = "all"; }}>
            Clear Filters
          </Button>
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- Popular Articles -->
<section class="py-12 lg:py-16" id="docs">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold mb-2">Popular Articles</h2>
        <p class="text-muted-foreground">Most read help articles</p>
      </div>
      <Button variant="outline" class="border-primary/30">
        View All Articles
        <ArrowRight class="w-4 h-4 ml-2" />
      </Button>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each popularArticles as article}
        <a href="/support/{article.slug}" class="group flex items-center justify-between p-4 bg-card/50 border border-border/50 rounded-xl hover:border-primary/50 hover:bg-card transition-all">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <FileText class="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 class="font-medium group-hover:text-primary transition-colors">{article.title}</h4>
              <p class="text-sm text-muted-foreground">{article.category}</p>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs text-muted-foreground">{article.reads} reads</span>
            <ChevronRight class="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- Refund Policy Section -->
<section class="py-12 lg:py-16 bg-muted/30" id="refunds">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-success-green/20 to-emerald-500/20 flex items-center justify-center">
          <Shield class="w-8 h-8 text-success-green" />
        </div>
        <h2 class="text-3xl font-bold mb-4">30-Day Money-Back Guarantee</h2>
        <p class="text-lg text-muted-foreground">
          We stand behind our products with a hassle-free refund policy
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6 mb-12">
        {#each [
          { icon: Clock, title: "30-Day Window", description: "Request a refund within 30 days of your purchase date" },
          { icon: CheckCircle, title: "No Questions Asked", description: "We'll process your refund without lengthy explanations" },
          { icon: Zap, title: "Fast Processing", description: "Refunds are typically processed within 3-5 business days" }
        ] as item}
          <Card.Root class="bg-card/50 border-border/50 text-center">
            <Card.Content class="pt-6">
              <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-success-green/20 to-emerald-500/20 flex items-center justify-center">
                <item.icon class="w-6 h-6 text-success-green" />
              </div>
              <h3 class="font-bold mb-2">{item.title}</h3>
              <p class="text-sm text-muted-foreground">{item.description}</p>
            </Card.Content>
          </Card.Root>
        {/each}
      </div>

      <Card.Root class="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
        <Card.Content class="pt-6">
          <h3 class="text-xl font-bold mb-4">How to Request a Refund</h3>
          <ol class="space-y-4">
            {#each [
              "Go to your account settings and find 'Purchase History'",
              "Locate the order you want to refund and click 'Request Refund'",
              "Select a reason (optional) and submit your request",
              "You'll receive a confirmation email within 24 hours",
              "Refund will be processed to your original payment method"
            ] as step, index}
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <span class="text-muted-foreground">{step}</span>
              </li>
            {/each}
          </ol>
        </Card.Content>
      </Card.Root>
    </div>
  </div>
</section>

<!-- Contact Form Section -->
<section class="py-12 lg:py-16">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Still Need Help?</h2>
        <p class="text-muted-foreground">
          Can't find what you're looking for? Send us a message.
        </p>
      </div>

      <Card.Root class="bg-card/50 border-border/50">
        <Card.Content class="pt-6">
          <form class="space-y-6">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label for="support-name" class="block text-sm font-medium mb-2">Name</label>
                <input
                  id="support-name"
                  type="text"
                  placeholder="Your name"
                  class="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label for="support-email" class="block text-sm font-medium mb-2">Email</label>
                <input
                  id="support-email"
                  type="email"
                  placeholder="your@email.com"
                  class="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label for="support-subject" class="block text-sm font-medium mb-2">Subject</label>
              <select id="support-subject" class="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
                <option>Select a topic</option>
                <option>Download Issues</option>
                <option>Payment & Billing</option>
                <option>Licensing Questions</option>
                <option>Refund Request</option>
                <option>Technical Support</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label for="support-message" class="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="support-message"
                rows="5"
                placeholder="Describe your issue or question..."
                class="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
              ></textarea>
            </div>

            <div class="flex items-start gap-2">
              <input type="checkbox" id="attachOrder" class="mt-1" />
              <label for="attachOrder" class="text-sm text-muted-foreground">
                Include my recent purchase history to help resolve the issue faster
              </label>
            </div>

            <Button class="w-full bg-gradient-to-r from-primary to-accent text-white border-0" size="lg">
              Send Message
              <ArrowRight class="w-5 h-5 ml-2" />
            </Button>
          </form>
        </Card.Content>
      </Card.Root>

      <div class="text-center mt-8 text-sm text-muted-foreground">
        <p>Average response time: <span class="font-medium text-foreground">Under 24 hours</span></p>
      </div>
    </div>
  </div>
</section>
