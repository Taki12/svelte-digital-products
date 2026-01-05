<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import * as Accordion from "$lib/components/ui/accordion";
  import { Separator } from "$lib/components/ui/separator";
  import {
    Shield,
    CheckCircle,
    XCircle,
    HelpCircle,
    ArrowRight,
    User,
    Building,
    Globe,
    Users,
    Briefcase,
    Zap,
    FileText,
    Scale,
    Mail
  } from "lucide-svelte";

  const licenses = [
    {
      name: "Personal License",
      price: "Base Price",
      description: "Perfect for personal projects, learning, and hobby use",
      icon: User,
      color: "from-blue-500 to-cyan-500",
      highlight: false,
      features: [
        { text: "Single user", included: true },
        { text: "Personal projects only", included: true },
        { text: "No commercial use", included: false },
        { text: "Community support", included: true },
        { text: "Lifetime updates", included: true },
        { text: "Attribution required", included: true },
        { text: "Client work", included: false },
        { text: "SaaS deployment", included: false }
      ],
      useCases: [
        "Portfolio websites",
        "Learning projects",
        "Personal blogs",
        "Non-profit projects"
      ]
    },
    {
      name: "Commercial License",
      price: "+50% of Base",
      description: "For freelancers, agencies, and businesses",
      icon: Building,
      color: "from-primary to-accent",
      highlight: true,
      features: [
        { text: "Single user", included: true },
        { text: "Personal projects", included: true },
        { text: "Commercial use", included: true },
        { text: "Priority support", included: true },
        { text: "Lifetime updates", included: true },
        { text: "No attribution required", included: true },
        { text: "Client work (unlimited)", included: true },
        { text: "SaaS deployment", included: false }
      ],
      useCases: [
        "Client websites",
        "Business applications",
        "E-commerce stores",
        "Marketing campaigns"
      ]
    },
    {
      name: "Extended License",
      price: "Contact Sales",
      description: "For enterprise, SaaS, and redistribution",
      icon: Globe,
      color: "from-purple-500 to-pink-500",
      highlight: false,
      features: [
        { text: "Unlimited users", included: true },
        { text: "All project types", included: true },
        { text: "Full commercial use", included: true },
        { text: "Dedicated support", included: true },
        { text: "Lifetime updates", included: true },
        { text: "No attribution required", included: true },
        { text: "Unlimited client work", included: true },
        { text: "SaaS & redistribution", included: true }
      ],
      useCases: [
        "SaaS applications",
        "White-label products",
        "Enterprise deployment",
        "Product redistribution"
      ]
    }
  ];

  const faqs = [
    {
      question: "What's the difference between Personal and Commercial licenses?",
      answer: "The Personal license is for non-commercial, personal use only. This includes learning, portfolio sites, and hobby projects. The Commercial license allows you to use products in commercial projects, including client work and products you sell."
    },
    {
      question: "Can I use a Personal license for freelance client work?",
      answer: "No, client work requires a Commercial license. If you're building a website or application for a client (paid or unpaid), you need a Commercial license for each product you use."
    },
    {
      question: "Do I need a new license for each project?",
      answer: "With a Commercial license, you can use the product in unlimited projects. Personal licenses are limited to a single personal project."
    },
    {
      question: "What does 'SaaS deployment' mean?",
      answer: "SaaS (Software as a Service) deployment means using our products to build applications that you offer as a service to customers who pay recurring fees. This requires an Extended license."
    },
    {
      question: "Can I upgrade my license later?",
      answer: "Yes! You can upgrade from Personal to Commercial or Extended at any time. You'll only pay the difference in price. Contact support for upgrade assistance."
    },
    {
      question: "What about team usage?",
      answer: "Personal and Commercial licenses are for single users. If multiple team members need access, each needs their own license, or you can purchase an Extended license for unlimited users."
    },
    {
      question: "Do licenses expire?",
      answer: "No, all licenses are perpetual. You get lifetime access to the product version you purchased, plus all future updates for free."
    },
    {
      question: "What if I need a custom license?",
      answer: "For unique requirements, enterprise deployments, or bulk purchases, contact our sales team. We offer custom licensing agreements tailored to your needs."
    }
  ];

  const comparisonFeatures = [
    { name: "Personal Use", personal: true, commercial: true, extended: true },
    { name: "Commercial Use", personal: false, commercial: true, extended: true },
    { name: "Client Projects", personal: false, commercial: true, extended: true },
    { name: "Number of Users", personal: "1", commercial: "1", extended: "Unlimited" },
    { name: "End Products", personal: "1", commercial: "Unlimited", extended: "Unlimited" },
    { name: "SaaS Deployment", personal: false, commercial: false, extended: true },
    { name: "Redistribution Rights", personal: false, commercial: false, extended: true },
    { name: "Attribution Required", personal: true, commercial: false, extended: false },
    { name: "Support", personal: "Community", commercial: "Priority", extended: "Dedicated" },
    { name: "Updates", personal: "Lifetime", commercial: "Lifetime", extended: "Lifetime" }
  ];
</script>

<svelte:head>
  <title>Licensing - DigitalVault</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative py-16 lg:py-24 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF610_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF610_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-3xl mx-auto text-center">
      <Badge class="mb-4 bg-primary/10 text-primary border-primary/20">
        <Shield class="w-3 h-3 mr-1" />
        Clear & Simple Licensing
      </Badge>
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Choose the Right
        <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          License
        </span>
        for Your Needs
      </h1>
      <p class="text-lg text-muted-foreground">
        Our licensing is straightforward and transparent. Pick the license that matches your use case and get started immediately.
      </p>
    </div>
  </div>
</section>

<!-- License Types -->
<section class="py-16 lg:py-20">
  <div class="container mx-auto px-4">
    <div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {#each licenses as license}
        <Card.Root class="relative overflow-hidden {license.highlight ? 'border-primary shadow-xl shadow-primary/20' : 'border-border/50'} hover:border-primary/50 transition-all">
          {#if license.highlight}
            <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-accent"></div>
            <Badge class="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-white border-0">
              Most Popular
            </Badge>
          {/if}

          <Card.Header class="text-center pb-4">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br {license.color} flex items-center justify-center">
              <license.icon class="w-8 h-8 text-white" />
            </div>
            <Card.Title class="text-2xl">{license.name}</Card.Title>
            <p class="text-2xl font-bold text-primary mt-2">{license.price}</p>
            <Card.Description class="mt-2">{license.description}</Card.Description>
          </Card.Header>

          <Card.Content>
            <ul class="space-y-3 mb-6">
              {#each license.features as feature}
                <li class="flex items-center gap-2 text-sm">
                  {#if feature.included}
                    <CheckCircle class="w-4 h-4 text-success-green shrink-0" />
                    <span>{feature.text}</span>
                  {:else}
                    <XCircle class="w-4 h-4 text-muted-foreground shrink-0" />
                    <span class="text-muted-foreground">{feature.text}</span>
                  {/if}
                </li>
              {/each}
            </ul>

            <Separator class="my-4" />

            <div>
              <p class="text-sm font-semibold mb-2">Perfect for:</p>
              <div class="flex flex-wrap gap-2">
                {#each license.useCases as useCase}
                  <Badge variant="outline" class="text-xs bg-muted/50">{useCase}</Badge>
                {/each}
              </div>
            </div>
          </Card.Content>

          <Card.Footer>
            <Button
              class="w-full {license.highlight ? 'bg-gradient-to-r from-primary to-accent text-white border-0' : ''}"
              variant={license.highlight ? 'default' : 'outline'}
              href="/products"
            >
              Browse Products
              <ArrowRight class="w-4 h-4 ml-2" />
            </Button>
          </Card.Footer>
        </Card.Root>
      {/each}
    </div>
  </div>
</section>

<!-- Comparison Table -->
<section class="py-16 lg:py-20 bg-muted/30">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-4">License Comparison</h2>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Compare features across all license types to find the perfect fit
      </p>
    </div>

    <div class="max-w-4xl mx-auto overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-border">
            <th class="py-4 px-4 text-left font-semibold">Feature</th>
            <th class="py-4 px-4 text-center font-semibold">Personal</th>
            <th class="py-4 px-4 text-center font-semibold bg-primary/5">Commercial</th>
            <th class="py-4 px-4 text-center font-semibold">Extended</th>
          </tr>
        </thead>
        <tbody>
          {#each comparisonFeatures as feature}
            <tr class="border-b border-border/50">
              <td class="py-4 px-4 text-sm">{feature.name}</td>
              <td class="py-4 px-4 text-center">
                {#if typeof feature.personal === 'boolean'}
                  {#if feature.personal}
                    <CheckCircle class="w-5 h-5 text-success-green mx-auto" />
                  {:else}
                    <XCircle class="w-5 h-5 text-muted-foreground mx-auto" />
                  {/if}
                {:else}
                  <span class="text-sm">{feature.personal}</span>
                {/if}
              </td>
              <td class="py-4 px-4 text-center bg-primary/5">
                {#if typeof feature.commercial === 'boolean'}
                  {#if feature.commercial}
                    <CheckCircle class="w-5 h-5 text-success-green mx-auto" />
                  {:else}
                    <XCircle class="w-5 h-5 text-muted-foreground mx-auto" />
                  {/if}
                {:else}
                  <span class="text-sm font-medium text-primary">{feature.commercial}</span>
                {/if}
              </td>
              <td class="py-4 px-4 text-center">
                {#if typeof feature.extended === 'boolean'}
                  {#if feature.extended}
                    <CheckCircle class="w-5 h-5 text-success-green mx-auto" />
                  {:else}
                    <XCircle class="w-5 h-5 text-muted-foreground mx-auto" />
                  {/if}
                {:else}
                  <span class="text-sm">{feature.extended}</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- Use Case Examples -->
<section class="py-16 lg:py-20">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-4">Which License Do You Need?</h2>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Real-world examples to help you choose the right license
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {#each [
        {
          scenario: "Learning & Portfolio",
          icon: User,
          license: "Personal",
          examples: ["Building a portfolio site", "Following tutorials", "School projects"],
          color: "from-blue-500 to-cyan-500"
        },
        {
          scenario: "Freelance Client Work",
          icon: Briefcase,
          license: "Commercial",
          examples: ["Client websites", "Agency projects", "Startup MVP"],
          color: "from-primary to-accent"
        },
        {
          scenario: "Product Business",
          icon: Zap,
          license: "Commercial",
          examples: ["E-commerce site", "Marketing site", "Internal tools"],
          color: "from-primary to-accent"
        },
        {
          scenario: "SaaS Application",
          icon: Globe,
          license: "Extended",
          examples: ["Subscription service", "B2B platform", "API service"],
          color: "from-purple-500 to-pink-500"
        },
        {
          scenario: "Team/Organization",
          icon: Users,
          license: "Extended",
          examples: ["Multi-user access", "Company-wide use", "Enterprise deployment"],
          color: "from-purple-500 to-pink-500"
        },
        {
          scenario: "Reselling/White-label",
          icon: Scale,
          license: "Extended",
          examples: ["Theme marketplace", "Template resale", "White-label products"],
          color: "from-purple-500 to-pink-500"
        }
      ] as scenario}
        <Card.Root class="bg-card/50 border-border/50 hover:border-primary/30 transition-all">
          <Card.Content class="pt-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br {scenario.color} flex items-center justify-center shrink-0">
                <scenario.icon class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="font-bold mb-1">{scenario.scenario}</h3>
                <Badge variant="outline" class="mb-3 bg-muted/50">{scenario.license} License</Badge>
                <ul class="space-y-1">
                  {#each scenario.examples as example}
                    <li class="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle class="w-3 h-3 text-success-green" />
                      {example}
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      {/each}
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section class="py-16 lg:py-20 bg-muted/30">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <Badge class="mb-4 bg-accent/10 text-accent border-accent/20">
        <HelpCircle class="w-3 h-3 mr-1" />
        FAQ
      </Badge>
      <h2 class="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Get answers to common licensing questions
      </p>
    </div>

    <div class="max-w-3xl mx-auto">
      <Accordion.Root type="single" class="w-full">
        {#each faqs as faq, index}
          <Accordion.Item value="item-{index}" class="border-b border-border/50">
            <Accordion.Trigger class="hover:no-underline py-4">
              <span class="text-left font-medium">{faq.question}</span>
            </Accordion.Trigger>
            <Accordion.Content>
              <p class="text-muted-foreground pb-4">{faq.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        {/each}
      </Accordion.Root>
    </div>
  </div>
</section>

<!-- Contact Section -->
<section class="py-16 lg:py-20">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto text-center">
      <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <Mail class="w-8 h-8 text-primary" />
      </div>
      <h2 class="text-3xl font-bold mb-4">Need Custom Licensing?</h2>
      <p class="text-lg text-muted-foreground mb-8">
        For enterprise, bulk purchases, or unique requirements, our team is here to help create a custom solution.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" class="bg-gradient-to-r from-primary to-accent text-white border-0" href="/support">
          Contact Sales
          <ArrowRight class="w-5 h-5 ml-2" />
        </Button>
        <Button size="lg" variant="outline" class="border-primary/30" href="/support">
          Read Full License Terms
        </Button>
      </div>
    </div>
  </div>
</section>
