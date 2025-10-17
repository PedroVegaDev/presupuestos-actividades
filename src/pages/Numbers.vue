<script setup lang="ts">
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Separator } from "@/components/ui/separator";
  import { logout } from "@/services/auth";
  import { useActivityStore } from "@/store";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const activityStore = useActivityStore();

  const handleSignOut = async () => {
    await logout();
    router.push({ name: "login" });
  };
</script>

<template>
  <section class="flex items-center gap-2 mb-4">
    <Label class="w-full text-md" for="price">Precio por unidad:</Label>
    <Input
      disabled
      required
      id="price"
      type="number"
      class="w-32"
      :default-value="activityStore.globalPrice"
    />
  </section>

  <section class="flex items-center gap-2 mb-4">
    <Label class="w-full text-md" for="price">Faltan pagar:</Label>
    <Input
      disabled
      required
      id="price"
      type="number"
      class="w-32"
      :default-value="activityStore.countNoPayments"
    />
  </section>

  <section class="flex items-center gap-2 mb-4">
    <Label class="w-full text-md" for="price">Total en Yape (S/):</Label>
    <Input
      disabled
      required
      id="price"
      type="number"
      class="w-32"
      :default-value="activityStore.totalYape"
    />
  </section>

  <section class="flex items-center gap-2 mb-4">
    <Label class="w-full text-md" for="price">Total en Efectivo (S/):</Label>
    <Input
      disabled
      required
      id="price"
      type="number"
      class="w-32"
      :default-value="activityStore.totalCash"
    />
  </section>

  <section class="flex items-center gap-2 mb-4">
    <Label class="w-full text-md" for="price">Total Recaudado (S/):</Label>
    <Input
      disabled
      required
      id="price"
      type="number"
      class="w-32"
      :default-value="activityStore.total"
    />
  </section>

  <Separator class="my-4" />

  <Button class="w-full mt-auto" @click="handleSignOut"> Cerrar Sesión </Button>
</template>
