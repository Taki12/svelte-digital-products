<script lang="ts">
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <title>DigitalVault - Premium Digital Products Marketplace</title>
  <meta name="description" content="Your trusted marketplace for premium digital products. Software, templates, courses, ebooks, and digital assets from top creators worldwide." />
</svelte:head>

<div class="min-h-screen flex flex-col dark">
  <Header />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>
