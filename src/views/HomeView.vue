<script>
import HeroSection from "../components/marketing/HeroSection.vue";
import JumpIn from "../components/marketing/JumpIn.vue";
import Defy from "../components/marketing/Defy.vue";
import CallToAction from "../components/marketing/CallToAction.vue";
import MarketingNavbar from "../components/navigation/MarketingNavbar.vue";

export default {
  components: { MarketingNavbar, CallToAction, Defy, JumpIn, HeroSection }
};
</script>

<template>
  <main>
    <marketing-navbar />
    <hero-section />
    <jump-in />
    <defy />
    <call-to-action />
  </main>
</template>
