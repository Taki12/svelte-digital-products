<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { Separator } from "$lib/components/ui/separator";
  import {
    ShoppingCart,
    Trash2,
    Heart,
    ArrowRight,
    Tag,
    Shield,
    Zap,
    RefreshCw,
    Gift,
    X,
    Plus,
    Minus,
    AlertCircle,
    CheckCircle,
    Lock
  } from "lucide-svelte";

  let cartItems = $state([
    {
      id: 2,
      name: "Full-Stack Development Masterclass",
      description: "Complete course with React, Node.js, and PostgreSQL",
      price: 89,
      originalPrice: 199,
      license: "personal",
      category: "Courses",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop&auto=format",
      author: "David Park"
    },
    {
      id: 3,
      name: "UI Component Library Pro",
      description: "500+ customizable React & Vue components",
      price: 79,
      originalPrice: 129,
      license: "commercial",
      category: "Templates",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop&auto=format",
      author: "Sarah Miller"
    },
    {
      id: 1,
      name: "ProCode IDE Theme Bundle",
      description: "50+ stunning themes for VS Code, JetBrains, and more",
      price: 29,
      originalPrice: 49,
      license: "personal",
      category: "Software",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop&auto=format",
      author: "Alex Chen"
    }
  ]);

  let couponCode = $state("");
  let couponApplied = $state(false);
  let couponError = $state("");

  const subtotal = $derived(
    cartItems.reduce((sum, item) => {
      const licenseMultiplier = item.license === 'commercial' ? 1.5 : 1;
      return sum + (item.price * licenseMultiplier);
    }, 0)
  );

  const savings = $derived(
    cartItems.reduce((sum, item) => {
      const licenseMultiplier = item.license === 'commercial' ? 1.5 : 1;
      return sum + ((item.originalPrice - item.price) * licenseMultiplier);
    }, 0)
  );

  const discount = $derived(couponApplied ? subtotal * 0.1 : 0);
  const total = $derived(subtotal - discount);

  function removeItem(id: number) {
    cartItems = cartItems.filter(item => item.id !== id);
  }

  function toggleLicense(id: number) {
    cartItems = cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          license: item.license === 'personal' ? 'commercial' : 'personal'
        };
      }
      return item;
    });
  }

  function applyCoupon() {
    if (couponCode.toUpperCase() === 'SAVE10') {
      couponApplied = true;
      couponError = "";
    } else {
      couponError = "Invalid coupon code";
    }
  }

  function removeCoupon() {
    couponApplied = false;
    couponCode = "";
  }

  const suggestedProducts = [
    {
      id: 5,
      name: "AI Prompt Engineering Guide",
      price: 19,
      originalPrice: 29,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=150&fit=crop&auto=format"
    },
    {
      id: 6,
      name: "SaaS Starter Kit",
      price: 149,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=150&fit=crop&auto=format"
    }
  ];
</script>

<svelte:head>
  <title>Shopping Cart - DigitalVault</title>
</svelte:head>

<!-- Header -->
<section class="py-8 lg:py-12 bg-gradient-to-b from-muted/30 to-background">
  <div class="container mx-auto px-4">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
        <ShoppingCart class="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
        <p class="text-muted-foreground">{cartItems.length} item(s) in your cart</p>
      </div>
    </div>
  </div>
</section>

<!-- Cart Content -->
<section class="py-8 lg:py-12">
  <div class="container mx-auto px-4">
    {#if cartItems.length > 0}
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          {#each cartItems as item (item.id)}
            <Card.Root class="overflow-hidden border-border/50 bg-card/50 backdrop-blur">
              <div class="flex flex-col sm:flex-row">
                <!-- Product Image -->
                <div class="sm:w-40 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    class="w-full h-32 sm:h-full object-cover"
                  />
                </div>

                <!-- Product Info -->
                <div class="flex-1 p-4 sm:p-6">
                  <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <Badge variant="outline" class="bg-muted/50 text-xs">{item.category}</Badge>
                        <span class="text-xs text-muted-foreground">by {item.author}</span>
                      </div>
                      <h3 class="font-bold text-lg mb-1">{item.name}</h3>
                      <p class="text-sm text-muted-foreground mb-4">{item.description}</p>

                      <!-- License Toggle -->
                      <div class="flex items-center gap-2">
                        <span class="text-sm text-muted-foreground">License:</span>
                        <div class="flex bg-muted rounded-lg p-1">
                          <button
                            class="px-3 py-1 text-sm rounded-md transition-all {item.license === 'personal' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}"
                            onclick={() => item.license !== 'personal' && toggleLicense(item.id)}
                          >
                            Personal
                          </button>
                          <button
                            class="px-3 py-1 text-sm rounded-md transition-all {item.license === 'commercial' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}"
                            onclick={() => item.license !== 'commercial' && toggleLicense(item.id)}
                          >
                            Commercial (+50%)
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Price & Actions -->
                    <div class="flex sm:flex-col items-center sm:items-end gap-4">
                      <div class="text-right">
                        <p class="text-2xl font-bold text-primary">
                          ${Math.round(item.price * (item.license === 'commercial' ? 1.5 : 1))}
                        </p>
                        <p class="text-sm text-muted-foreground line-through">
                          ${Math.round(item.originalPrice * (item.license === 'commercial' ? 1.5 : 1))}
                        </p>
                      </div>
                      <div class="flex items-center gap-2">
                        <Button variant="ghost" size="icon" class="text-muted-foreground hover:text-primary">
                          <Heart class="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" class="text-muted-foreground hover:text-destructive" onclick={() => removeItem(item.id)}>
                          <Trash2 class="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Root>
          {/each}

          <!-- Continue Shopping -->
          <div class="flex items-center justify-between pt-4">
            <Button variant="outline" class="border-primary/30" href="/products">
              <ArrowRight class="w-4 h-4 mr-2 rotate-180" />
              Continue Shopping
            </Button>
          </div>
        </div>

        <!-- Order Summary -->
        <div>
          <Card.Root class="sticky top-24 border-border/50 bg-card/50 backdrop-blur">
            <Card.Header>
              <Card.Title>Order Summary</Card.Title>
            </Card.Header>
            <Card.Content class="space-y-4">
              <!-- Subtotal -->
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <!-- Savings -->
              {#if savings > 0}
                <div class="flex justify-between text-sm">
                  <span class="text-success-green">You're saving</span>
                  <span class="text-success-green">-${savings.toFixed(2)}</span>
                </div>
              {/if}

              <!-- Coupon -->
              {#if couponApplied}
                <div class="flex justify-between text-sm">
                  <div class="flex items-center gap-2">
                    <span class="text-success-green">Coupon (SAVE10)</span>
                    <button onclick={removeCoupon} class="text-muted-foreground hover:text-destructive">
                      <X class="w-3 h-3" />
                    </button>
                  </div>
                  <span class="text-success-green">-${discount.toFixed(2)}</span>
                </div>
              {:else}
                <div class="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    bind:value={couponCode}
                    class="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button variant="outline" size="sm" class="border-primary/30" onclick={applyCoupon}>
                    Apply
                  </Button>
                </div>
                {#if couponError}
                  <p class="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle class="w-3 h-3" />
                    {couponError}
                  </p>
                {/if}
              {/if}

              <Separator />

              <!-- Total -->
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span class="text-primary">${total.toFixed(2)}</span>
              </div>

              <!-- Checkout Button -->
              <Button class="w-full bg-gradient-to-r from-primary to-accent text-white border-0 h-12" size="lg" href="/checkout">
                <Lock class="w-4 h-4 mr-2" />
                Proceed to Checkout
              </Button>

              <!-- Trust Badges -->
              <div class="pt-4 space-y-3">
                {#each [
                  { icon: Shield, text: "Secure 256-bit SSL encryption" },
                  { icon: Zap, text: "Instant download after purchase" },
                  { icon: RefreshCw, text: "30-day money-back guarantee" }
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

      <!-- You May Also Like -->
      <section class="mt-16">
        <h2 class="text-2xl font-bold mb-6">You May Also Like</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {#each suggestedProducts as product}
            <Card.Root class="group overflow-hidden border-border/50 hover:border-primary/50 transition-all bg-card/50">
              <div class="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  class="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <Card.Content class="p-4">
                <h4 class="font-medium mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h4>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="font-bold text-primary">${product.price}</span>
                    <span class="text-sm text-muted-foreground line-through ml-1">${product.originalPrice}</span>
                  </div>
                  <Button size="sm" variant="outline" class="border-primary/30 hover:bg-primary hover:text-white">
                    <Plus class="w-4 h-4" />
                  </Button>
                </div>
              </Card.Content>
            </Card.Root>
          {/each}
        </div>
      </section>
    {:else}
      <!-- Empty Cart -->
      <div class="max-w-md mx-auto text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 rounded-2xl bg-muted/50 flex items-center justify-center">
          <ShoppingCart class="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 class="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p class="text-muted-foreground mb-8">
          Looks like you haven't added any products yet. Start exploring our collection!
        </p>
        <Button class="bg-gradient-to-r from-primary to-accent text-white border-0" size="lg" href="/products">
          Browse Products
          <ArrowRight class="w-5 h-5 ml-2" />
        </Button>
      </div>
    {/if}
  </div>
</section>

<!-- Gift Banner -->
{#if cartItems.length > 0}
  <section class="py-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Gift class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-bold text-lg">Buying for someone else?</h3>
            <p class="text-muted-foreground">Send this purchase as a gift with a personal message</p>
          </div>
        </div>
        <Button variant="outline" class="border-primary/30">
          Add Gift Message
        </Button>
      </div>
    </div>
  </section>
{/if}
