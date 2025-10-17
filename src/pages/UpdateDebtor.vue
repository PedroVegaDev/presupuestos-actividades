<script setup lang="ts">
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { reactive, ref } from "vue";
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
  import { Switch } from "@/components/ui/switch";
  import {
    clearOneOfCurrentActivity,
    updateDataOfCurrentActivity,
  } from "@/services/db";
  import { useActivityStore } from "@/store";
  import { Debtor } from "@/interfaces";
  import { useRoute, useRouter } from "vue-router";

  const router = useRouter();
  const route = useRoute();
  const activityStore = useActivityStore();
  const indexDebtor = Number(route.params.index as string);
  const debtor = activityStore.debtorList[+indexDebtor];

  const newDebtor = reactive<Debtor>({ ...debtor });
  const isLoading = ref(false);
  const isDeleted = ref(false);
  const isUpdated = ref(false);

  const handleUpdate = async () => {
    isUpdated.value = true;
    isLoading.value = true;
    await updateDataOfCurrentActivity(
      activityStore.debtorList,
      { ...newDebtor },
      indexDebtor
    );
    activityStore.debtorList[indexDebtor] = { ...newDebtor };
    isLoading.value = false;
    isUpdated.value = false;
    router.back();
  };

  const handleDelete = async () => {
    isDeleted.value = true;
    isLoading.value = true;
    await clearOneOfCurrentActivity({ ...newDebtor });
    activityStore.debtorList.splice(indexDebtor, 1);
    isLoading.value = false;
    isDeleted.value = false;
    router.back();
  };
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-center text-xl font-bold">Editar Deudor</h1>
    <div>
      <Label for="name" class="text-right mb-2"> Nombre </Label>
      <Input
        :disabled="isLoading"
        id="name"
        v-model="newDebtor.name"
        class="col-span-3"
      />
    </div>
    <div>
      <Label for="quantity" class="text-right mb-2"> Cantidad </Label>
      <Input
        :disabled="isLoading"
        id="quantity"
        v-model="newDebtor.quantity"
        class="col-span-3"
        type="number"
      />
    </div>
    <div>
      <Label for="prece_modificated" class="text-right mb-2">
        Modificar Precio por Unidad
      </Label>
      <Input
        :disabled="isLoading"
        type="number"
        id="prece_modificated"
        class="col-span-3"
        v-model="newDebtor.price_modificated"
        :default-value="newDebtor.price_modificated"
      />
    </div>
    <div>
      <RadioGroup
        :disabled="isLoading"
        v-model="newDebtor.cash"
        :default-value="newDebtor.cash"
        class="flex"
      >
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r1" value="yape" />
          <Label for="r1">Yape</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r2" value="cash" />
          <Label for="r2">Efectivo</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r3" value="dont-payment" />
          <Label for="r3">No pago</Label>
        </div>
      </RadioGroup>
    </div>
    <div>
      Entregado
      <Switch :disabled="isLoading" v-model="newDebtor.delivered" />
    </div>

    <Button :disabled="isLoading" variant="secondary" @click="handleDelete">
      {{ isDeleted ? "Eliminando.." : "Eliminar Deudor" }}
    </Button>
    <Button :disabled="isLoading" @click="handleUpdate"
      >{{ isUpdated ? "Guardando.." : "Guardar Cambios" }}
    </Button>
  </div>
</template>
