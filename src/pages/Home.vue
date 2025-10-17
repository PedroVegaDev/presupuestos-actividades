<script setup lang="ts">
  import Separator from "@/components/ui/separator/Separator.vue";
  import { useActivityStore } from "@/store";
  import DebtorCard from "@/components/DebtorCard.vue";
  import { useRouter } from "vue-router";
  import { Button } from "@/components/ui/button";

  const activityStore = useActivityStore();
  const router = useRouter();
</script>

<template>
  <Button class="w-full" @click="() => router.push({ name: 'create-debtor' })">
    Crear Deudor
  </Button>

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
