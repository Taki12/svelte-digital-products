<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Separator } from "$lib/components/ui/separator";
  import {
    CreditCard,
    Lock,
    Shield,
    CheckCircle,
    ArrowLeft,
    Mail,
    User,
    Building,
    MapPin,
    Zap,
    RefreshCw,
    ChevronRight,
    Download
  } from "lucide-svelte";

  let step = $state(1);
  let paymentMethod = $state<"card" | "paypal">("card");
  let savePaymentInfo = $state(false);
  let agreeToTerms = $state(false);

  const orderItems = [
    {
      id: 2,
      name: "Full-Stack Development Masterclass",
      price: 89,
      license: "personal",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=80&fit=crop&auto=format"
    },
    {
      id: 3,
      name: "UI Component Library Pro",
      price: 119,
      license: "commercial",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=100&h=80&fit=crop&auto=format"
    },
    {
      id: 1,
      name: "ProCode IDE Theme Bundle",
      price: 29,
      license: "personal",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=80&fit=crop&auto=format"
    }
  ];

  const subtotal = $derived(orderItems.reduce((sum, item) => sum + item.price, 0));
  const discount = $derived(subtotal * 0.1);
  const total = $derived(subtotal - discount);
</script>

<svelte:head>
  <title>Checkout - DigitalVault</title>
</svelte:head>

<!-- Progress Header -->
<section class="py-4 border-b border-border/50 bg-muted/30">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between">
      <Button variant="ghost" size="sm" href="/cart">
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back to Cart
      </Button>
      <div class="hidden sm:flex items-center gap-4">
        {#each [
          { num: 1, label: "Information" },
          { num: 2, label: "Payment" },
          { num: 3, label: "Confirmation" }
        ] as s}
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold {step >= s.num ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}">
              {#if step > s.num}
                <CheckCircle class="w-4 h-4" />
              {:else}
                {s.num}
              {/if}
            </div>
            <span class="text-sm {step >= s.num ? 'text-foreground' : 'text-muted-foreground'}">{s.label}</span>
          </div>
          {#if s.num < 3}
            <ChevronRight class="w-4 h-4 text-muted-foreground" />
          {/if}
        {/each}
      </div>
      <div class="flex items-center gap-1 text-sm text-muted-foreground">
        <Lock class="w-4 h-4" />
        Secure Checkout
      </div>
    </div>
  </div>
</section>

<!-- Checkout Content -->
<section class="py-8 lg:py-12">
  <div class="container mx-auto px-4">
    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        {#if step === 1}
          <!-- Step 1: Customer Information -->
          <Card.Root class="border-border/50 bg-card/50">
            <Card.Header>
              <Card.Title class="flex items-center gap-2">
                <User class="w-5 h-5 text-primary" />
                Contact Information
              </Card.Title>
            </Card.Header>
            <Card.Content class="space-y-6">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    class="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    class="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Email Address</label>
                <div class="relative">
                  <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    class="w-full pl-11 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
                <p class="text-xs text-muted-foreground mt-1">
                  Your purchase receipt and download links will be sent here
                </p>
              </div>

              <Separator />

              <div>
                <h3 class="font-semibold mb-4 flex items-center gap-2">
                  <Building class="w-5 h-5 text-primary" />
                  Billing Information (Optional)
                </h3>
                <p class="text-sm text-muted-foreground mb-4">
                  Add for business invoicing
                </p>

                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      placeholder="Your Company Inc."
                      class="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">VAT / Tax ID</label>
                    <input
                      type="text"
                      placeholder="EU123456789"
                      class="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div class="grid md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-2">Country</label>
                      <select class="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Germany</option>
                        <option>France</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">Postal Code</label>
                      <input
                        type="text"
                        placeholder="10001"
                        class="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card.Content>
            <Card.Footer>
              <Button class="w-full bg-gradient-to-r from-primary to-accent text-white border-0" size="lg" onclick={() => step = 2}>
                Continue to Payment
                <ChevronRight class="w-5 h-5 ml-2" />
              </Button>
            </Card.Footer>
          </Card.Root>
        {:else if step === 2}
          <!-- Step 2: Payment -->
          <Card.Root class="border-border/50 bg-card/50">
            <Card.Header>
              <Card.Title class="flex items-center gap-2">
                <CreditCard class="w-5 h-5 text-primary" />
                Payment Method
              </Card.Title>
            </Card.Header>
            <Card.Content class="space-y-6">
              <!-- Payment Method Selection -->
              <div class="grid grid-cols-2 gap-4">
                <button
                  class="p-4 rounded-xl border-2 text-left transition-all {paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}"
                  onclick={() => paymentMethod = 'card'}
                >
                  <div class="flex items-center gap-3">
                    <CreditCard class="w-6 h-6 text-primary" />
                    <div>
                      <p class="font-semibold">Credit Card</p>
                      <p class="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                    </div>
                  </div>
                </button>
                <button
                  class="p-4 rounded-xl border-2 text-left transition-all {paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}"
                  onclick={() => paymentMethod = 'paypal'}
                >
                  <div class="flex items-center gap-3">
                    <div class="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">PP</div>
                    <div>
                      <p class="font-semibold">PayPal</p>
                      <p class="text-xs text-muted-foreground">Fast & secure</p>
                    </div>
                  </div>
                </button>
              </div>

              {#if paymentMethod === 'card'}
                <!-- Card Form -->
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Card Number</label>
                    <div class="relative">
                      <CreditCard class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        class="w-full pl-11 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        class="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        class="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2">Name on Card</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      class="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>

                  <div class="flex items-center gap-2">
                    <Checkbox bind:checked={savePaymentInfo} />
                    <label class="text-sm text-muted-foreground">
                      Save card for future purchases
                    </label>
                  </div>
                </div>
              {:else}
                <!-- PayPal -->
                <div class="text-center py-8 bg-muted/30 rounded-xl">
                  <div class="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                    PP
                  </div>
                  <p class="text-muted-foreground mb-4">
                    You'll be redirected to PayPal to complete your purchase
                  </p>
                </div>
              {/if}

              <Separator />

              <!-- Terms -->
              <div class="flex items-start gap-2">
                <Checkbox bind:checked={agreeToTerms} class="mt-1" />
                <label class="text-sm text-muted-foreground">
                  I agree to the <a href="/terms" class="text-primary hover:underline">Terms of Service</a> and <a href="/licensing" class="text-primary hover:underline">License Agreement</a>
                </label>
              </div>
            </Card.Content>
            <Card.Footer class="flex gap-4">
              <Button variant="outline" class="border-primary/30" onclick={() => step = 1}>
                <ArrowLeft class="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                class="flex-1 bg-gradient-to-r from-primary to-accent text-white border-0"
                size="lg"
                onclick={() => step = 3}
                disabled={!agreeToTerms}
              >
                <Lock class="w-4 h-4 mr-2" />
                Pay ${total.toFixed(2)}
              </Button>
            </Card.Footer>
          </Card.Root>
        {:else}
          <!-- Step 3: Confirmation -->
          <Card.Root class="border-border/50 bg-card/50 text-center">
            <Card.Content class="pt-12 pb-8">
              <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-success-green to-emerald-600 flex items-center justify-center">
                <CheckCircle class="w-10 h-10 text-white" />
              </div>
              <h2 class="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p class="text-muted-foreground mb-6">
                Thank you for your purchase. Your order has been confirmed.
              </p>

              <div class="bg-muted/30 rounded-xl p-6 mb-6 text-left">
                <div class="flex justify-between mb-2">
                  <span class="text-muted-foreground">Order Number</span>
                  <span class="font-mono font-bold">#DV-2024-12345</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span class="text-muted-foreground">Date</span>
                  <span>December 28, 2024</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Total Paid</span>
                  <span class="font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <div class="space-y-4 mb-8">
                <p class="text-sm text-muted-foreground">
                  A confirmation email has been sent to <span class="text-foreground">john@example.com</span>
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <Button class="bg-gradient-to-r from-primary to-accent text-white border-0" size="lg" href="/downloads">
                  <Download class="w-5 h-5 mr-2" />
                  Go to My Downloads
                </Button>
                <Button variant="outline" class="border-primary/30" size="lg" href="/products">
                  Continue Shopping
                </Button>
              </div>
            </Card.Content>
          </Card.Root>
        {/if}
      </div>

      <!-- Order Summary Sidebar -->
      <div>
        <Card.Root class="sticky top-24 border-border/50 bg-card/50">
          <Card.Header>
            <Card.Title>Order Summary</Card.Title>
          </Card.Header>
          <Card.Content class="space-y-4">
            <!-- Items -->
            <div class="space-y-3">
              {#each orderItems as item}
                <div class="flex gap-3">
                  <img src={item.image} alt={item.name} class="w-16 h-12 object-cover rounded-lg" />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium line-clamp-1">{item.name}</p>
                    <div class="flex items-center gap-2">
                      <Badge variant="outline" class="text-xs">{item.license}</Badge>
                    </div>
                  </div>
                  <p class="font-bold text-sm">${item.price}</p>
                </div>
              {/each}
            </div>

            <Separator />

            <!-- Totals -->
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-success-green">Discount (10%)</span>
                <span class="text-success-green">-${discount.toFixed(2)}</span>
              </div>
              <Separator />
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span class="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <!-- Trust Badges -->
            <div class="pt-4 space-y-3">
              {#each [
                { icon: Shield, text: "Secure 256-bit SSL" },
                { icon: Zap, text: "Instant download" },
                { icon: RefreshCw, text: "30-day guarantee" }
              ] as badge}
                <div class="flex items-center gap-2 text-xs text-muted-foreground">
                  <badge.icon class="w-4 h-4 text-success-green" />
                  {badge.text}
                </div>
              {/each}
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  </div>
</section>

<!-- Security Footer -->
<section class="py-8 border-t border-border/50 bg-muted/30">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
      <div class="flex items-center gap-2">
        <Lock class="w-4 h-4" />
        <span>SSL Encrypted</span>
      </div>
      <div class="flex items-center gap-2">
        <Shield class="w-4 h-4" />
        <span>PCI Compliant</span>
      </div>
      <div class="flex items-center gap-2">
        <RefreshCw class="w-4 h-4" />
        <span>Money-Back Guarantee</span>
      </div>
    </div>
  </div>
</section>
