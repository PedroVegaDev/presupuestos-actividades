<script setup lang="ts">
  import Separator from "@/components/ui/separator/Separator.vue";
  import { useActivityStore } from "@/store";
  import DebtorCard from "@/components/DebtorCard.vue";
  import CreateDebtor from "@/components/CreateDebtor.vue";

  const activityStore = useActivityStore();
</script>

<template>
  <CreateDebtor />

  <Separator class="my-4" />

  <section class="flex flex-col gap-4 h-[560px] overflow-y-auto">
    <DebtorCard
      v-for="(debtor, index) in activityStore.debtorList"
      :key="debtor.name"
      :debtor="debtor"
      :index-debtor="index"
    />
  </section>
</template>
