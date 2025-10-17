<script setup lang="ts">
  import LoadingSpinner from "@/components/LoadingSpinner.vue";
  import { Button } from "@/components/ui/button";
  import { ButtonGroup } from "@/components/ui/button-group";
  import { Separator } from "@/components/ui/separator";
  import { getDataOfCurrentActivity } from "@/services/db";
  import { useActivityStore } from "@/store";
  import { onMounted } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const activityStore = useActivityStore();

  onMounted(async () => {
    const data = await getDataOfCurrentActivity();
    if (data) {
      activityStore.setGlobalPrice(data.global_price);
      activityStore.setDebtorList(data.debtor_list);
      activityStore.setIsLoadingData(false);
    }
  });
</script>

<template>
  <main
    class="h-dvh flex flex-col"
    :class="activityStore.isLoadingData ? 'items-center justify-center' : ''"
  >
    <LoadingSpinner v-if="activityStore.isLoadingData" />
    <template v-else>
      <section class="p-4">
        <RouterView />
      </section>

      <ButtonGroup class="mt-auto w-full">
        <Button
          class="flex-1"
          variant="secondary"
          @click="() => router.push({ name: 'home' })"
        >
          Deudores
        </Button>
        <Separator orientation="vertical" />
        <Button
          class="flex-1"
          variant="secondary"
          @click="() => router.push({ name: 'numbers' })"
        >
          Números
        </Button>
      </ButtonGroup>
    </template>
  </main>
</template>
