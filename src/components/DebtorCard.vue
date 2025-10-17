<script setup lang="ts">
  import { Debtor } from "@/interfaces";
  import { Card, CardContent } from "./ui/card";
  import IconCash from "./icons/IconCash.vue";
  import IconDelivered from "./icons/IconDelivered.vue";
  import { useRouter } from "vue-router";

  interface Props {
    debtor: Debtor;
    indexDebtor: number;
  }

  const props = defineProps<Props>();
  const router = useRouter();

  const handleClick = () => {
    router.push({
      name: "update-debtor",
      params: { index: props.indexDebtor },
    });
  };
</script>

<template>
  <Card @click="handleClick">
    <CardContent class="flex items-center justify-between">
      <div>
        <p class="text-lg font-semibold">{{ props.debtor.name }}</p>
        <p>
          {{ props.debtor.quantity }}
          {{ props.debtor.quantity > 1 ? "Turrones" : "Turrón" }}
        </p>
        <p>S/ {{ props.debtor.quantity * props.debtor.price_modificated! }}</p>
      </div>

      <div class="flex-col">
        <div class="mb-2">
          <IconCash
            class="w-8 h-8 text-green-500"
            v-if="props.debtor.cash === 'cash'"
          />
          <img
            v-else-if="props.debtor.cash === 'yape'"
            class="w-8 h-8"
            src="/logo-yape.png"
            alt="Yape"
          />
        </div>
        <IconDelivered
          class="w-8 h-8 text-green-500"
          v-if="props.debtor.delivered"
        />
      </div>
    </CardContent>
  </Card>
</template>
