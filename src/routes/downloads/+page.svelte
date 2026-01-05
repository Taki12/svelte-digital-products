<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import * as Tabs from "$lib/components/ui/tabs";
  import { Separator } from "$lib/components/ui/separator";
  import {
    Download,
    FileArchive,
    Clock,
    CheckCircle,
    RefreshCw,
    Key,
    ExternalLink,
    Search,
    Filter,
    FolderOpen,
    Star,
    Code,
    BookOpen,
    GraduationCap,
    Palette,
    Sparkles,
    MoreVertical,
    Eye,
    Trash2,
    HelpCircle
  } from "lucide-svelte";

  const purchases = [
    {
      id: 1,
      name: "Full-Stack Development Masterclass",
      category: "Courses",
      icon: GraduationCap,
      purchaseDate: "Dec 15, 2024",
      version: "2.4.0",
      lastDownload: "Dec 16, 2024",
      license: "Personal",
      licenseKey: "FSDK-XXXX-XXXX-XXXX",
      status: "active",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop&auto=format",
      files: [
        { name: "Course Videos (MP4)", size: "12.5 GB", type: "zip" },
        { name: "Source Code", size: "45 MB", type: "zip" },
        { name: "PDF Resources", size: "125 MB", type: "pdf" }
      ],
      updates: true,
      updateVersion: "2.5.0"
    },
    {
      id: 2,
      name: "UI Component Library Pro",
      category: "Templates",
      icon: Palette,
      purchaseDate: "Dec 10, 2024",
      version: "3.2.1",
      lastDownload: "Dec 12, 2024",
      license: "Commercial",
      licenseKey: "UICP-XXXX-XXXX-XXXX",
      status: "active",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop&auto=format",
      files: [
        { name: "React Components", size: "28 MB", type: "zip" },
        { name: "Vue Components", size: "24 MB", type: "zip" },
        { name: "Documentation", size: "8 MB", type: "pdf" }
      ],
      updates: false
    },
    {
      id: 3,
      name: "ProCode IDE Theme Bundle",
      category: "Software",
      icon: Code,
      purchaseDate: "Nov 28, 2024",
      version: "1.8.0",
      lastDownload: "Nov 29, 2024",
      license: "Personal",
      licenseKey: "PCTB-XXXX-XXXX-XXXX",
      status: "active",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop&auto=format",
      files: [
        { name: "VS Code Themes", size: "15 MB", type: "zip" },
        { name: "JetBrains Themes", size: "12 MB", type: "zip" },
        { name: "Sublime Text Themes", size: "8 MB", type: "zip" }
      ],
      updates: true,
      updateVersion: "2.0.0"
    },
    {
      id: 4,
      name: "AI Prompt Engineering Guide",
      category: "Ebooks",
      icon: BookOpen,
      purchaseDate: "Nov 15, 2024",
      version: "1.2.0",
      lastDownload: "Nov 15, 2024",
      license: "Personal",
      licenseKey: "APEG-XXXX-XXXX-XXXX",
      status: "active",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop&auto=format",
      files: [
        { name: "Complete Guide (PDF)", size: "35 MB", type: "pdf" },
        { name: "Prompt Templates", size: "2 MB", type: "txt" },
        { name: "Bonus Resources", size: "15 MB", type: "zip" }
      ],
      updates: false
    },
    {
      id: 5,
      name: "3D Icon Pack Pro",
      category: "Assets",
      icon: Sparkles,
      purchaseDate: "Oct 20, 2024",
      version: "2.1.0",
      lastDownload: "Oct 22, 2024",
      license: "Commercial",
      licenseKey: "3DIP-XXXX-XXXX-XXXX",
      status: "active",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop&auto=format",
      files: [
        { name: "PNG Icons (1024px)", size: "450 MB", type: "zip" },
        { name: "SVG Icons", size: "85 MB", type: "zip" },
        { name: "Figma File", size: "120 MB", type: "fig" }
      ],
      updates: true,
      updateVersion: "2.2.0"
    }
  ];

  let searchQuery = $state("");
  let selectedCategory = $state<string | null>(null);

  const filteredPurchases = $derived(
    purchases.filter(p => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
  );

  const categories = ["Courses", "Templates", "Software", "Ebooks", "Assets"];
</script>

<svelte:head>
  <title>My Downloads - DigitalVault</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative py-12 lg:py-16 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF610_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF610_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <Badge class="mb-4 bg-primary/10 text-primary border-primary/20">
          <Download class="w-3 h-3 mr-1" />
          Your Library
        </Badge>
        <h1 class="text-3xl md:text-4xl font-bold mb-2">My Downloads</h1>
        <p class="text-muted-foreground">
          Access all your purchased products and downloads
        </p>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right">
          <p class="text-2xl font-bold text-primary">{purchases.length}</p>
          <p class="text-sm text-muted-foreground">Products Owned</p>
        </div>
        <Separator orientation="vertical" class="h-12" />
        <div class="text-right">
          <p class="text-2xl font-bold text-accent">{purchases.filter(p => p.updates).length}</p>
          <p class="text-sm text-muted-foreground">Updates Available</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Downloads Section -->
<section class="py-8 lg:py-12">
  <div class="container mx-auto px-4">
    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <div class="relative flex-1 max-w-md">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search your products..."
          bind:value={searchQuery}
          class="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onclick={() => selectedCategory = null}
          class={selectedCategory === null ? "bg-gradient-to-r from-primary to-accent text-white border-0" : "border-primary/30"}
        >
          All
        </Button>
        {#each categories as category}
          <Button
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onclick={() => selectedCategory = selectedCategory === category ? null : category}
            class={selectedCategory === category ? "bg-gradient-to-r from-primary to-accent text-white border-0" : "border-primary/30"}
          >
            {category}
          </Button>
        {/each}
      </div>
    </div>

    <!-- Updates Available Banner -->
    {#if purchases.some(p => p.updates)}
      <div class="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 border border-accent/20 rounded-xl p-4 mb-8">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <RefreshCw class="w-5 h-5 text-accent" />
            </div>
            <div>
              <p class="font-semibold">Updates Available</p>
              <p class="text-sm text-muted-foreground">{purchases.filter(p => p.updates).length} product(s) have new versions ready to download</p>
            </div>
          </div>
          <Button variant="outline" class="border-accent/30 text-accent hover:bg-accent/10">
            Update All
          </Button>
        </div>
      </div>
    {/if}

    <!-- Products List -->
    <div class="space-y-4">
      {#each filteredPurchases as product}
        <Card.Root class="overflow-hidden border-border/50 hover:border-primary/30 transition-all bg-card/50 backdrop-blur">
          <div class="flex flex-col lg:flex-row">
            <!-- Product Image -->
            <div class="lg:w-48 shrink-0">
              <img
                src={product.image}
                alt={product.name}
                class="w-full h-32 lg:h-full object-cover"
              />
            </div>

            <!-- Product Info -->
            <div class="flex-1 p-6">
              <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <Badge variant="outline" class="bg-muted/50">
                      <product.icon class="w-3 h-3 mr-1" />
                      {product.category}
                    </Badge>
                    <Badge variant="outline" class="bg-muted/50">
                      v{product.version}
                    </Badge>
                    {#if product.updates}
                      <Badge class="bg-accent/10 text-accent border-accent/20">
                        <RefreshCw class="w-3 h-3 mr-1" />
                        Update to v{product.updateVersion}
                      </Badge>
                    {/if}
                  </div>

                  <h3 class="text-xl font-bold mb-2">{product.name}</h3>

                  <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div class="flex items-center gap-1">
                      <Clock class="w-4 h-4" />
                      <span>Purchased: {product.purchaseDate}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <Key class="w-4 h-4" />
                      <span>License: {product.license}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <Download class="w-4 h-4" />
                      <span>Last download: {product.lastDownload}</span>
                    </div>
                  </div>

                  <!-- Files -->
                  <div class="grid md:grid-cols-3 gap-3">
                    {#each product.files as file}
                      <div class="flex items-center justify-between p-3 bg-muted/30 rounded-lg group hover:bg-muted/50 transition-colors">
                        <div class="flex items-center gap-2">
                          <FileArchive class="w-4 h-4 text-primary" />
                          <div>
                            <p class="text-sm font-medium">{file.name}</p>
                            <p class="text-xs text-muted-foreground">{file.size}</p>
                          </div>
                        </div>
                        <Button size="icon" variant="ghost" class="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Download class="w-4 h-4" />
                        </Button>
                      </div>
                    {/each}
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-row lg:flex-col gap-2 shrink-0">
                  <Button class="bg-gradient-to-r from-primary to-accent text-white border-0">
                    <Download class="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                  <Button variant="outline" class="border-primary/30">
                    <Key class="w-4 h-4 mr-2" />
                    View License
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card.Root>
      {/each}
    </div>

    <!-- Empty State -->
    {#if filteredPurchases.length === 0}
      <div class="text-center py-16">
        <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted/50 flex items-center justify-center">
          <FolderOpen class="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 class="text-xl font-bold mb-2">No products found</h3>
        <p class="text-muted-foreground mb-6">
          {searchQuery ? "Try adjusting your search query" : "Start by browsing our product catalog"}
        </p>
        <Button class="bg-gradient-to-r from-primary to-accent text-white border-0" href="/products">
          Browse Products
        </Button>
      </div>
    {/if}
  </div>
</section>

<!-- Help Section -->
<section class="py-12 bg-muted/30">
  <div class="container mx-auto px-4">
    <div class="grid md:grid-cols-3 gap-6">
      <Card.Root class="bg-card/50 border-border/50">
        <Card.Content class="pt-6">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
            <HelpCircle class="w-6 h-6 text-primary" />
          </div>
          <h3 class="font-bold mb-2">Need Help?</h3>
          <p class="text-sm text-muted-foreground mb-4">
            Having trouble with your downloads? Check our FAQ or contact support.
          </p>
          <Button variant="outline" size="sm" class="border-primary/30" href="/support">
            Get Support
          </Button>
        </Card.Content>
      </Card.Root>

      <Card.Root class="bg-card/50 border-border/50">
        <Card.Content class="pt-6">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
            <Key class="w-6 h-6 text-primary" />
          </div>
          <h3 class="font-bold mb-2">License Management</h3>
          <p class="text-sm text-muted-foreground mb-4">
            View and manage your license keys, upgrade to commercial licenses.
          </p>
          <Button variant="outline" size="sm" class="border-primary/30" href="/licensing">
            Manage Licenses
          </Button>
        </Card.Content>
      </Card.Root>

      <Card.Root class="bg-card/50 border-border/50">
        <Card.Content class="pt-6">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
            <RefreshCw class="w-6 h-6 text-primary" />
          </div>
          <h3 class="font-bold mb-2">Automatic Updates</h3>
          <p class="text-sm text-muted-foreground mb-4">
            Get notified when new versions are available for your products.
          </p>
          <Button variant="outline" size="sm" class="border-primary/30">
            Enable Notifications
          </Button>
        </Card.Content>
      </Card.Root>
    </div>
  </div>
</section>
