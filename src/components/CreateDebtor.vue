<script setup lang="ts">
  import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  import { Label } from "./ui/label";
  import { Input } from "./ui/input";
  import { Button } from "./ui/button";
  import { reactive, ref } from "vue";
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
  import { Switch } from "./ui/switch";
  import {
    getDataOfCurrentActivity,
    saveDataOfCurrentActivity,
  } from "@/services/db";
  import { useActivityStore } from "@/store";
  import { Debtor } from "@/interfaces";

  const activityStore = useActivityStore();

  const newDebtor = reactive<Debtor>({
    name: "",
    quantity: 0,
    delivered: false,
    cash: "dont-payment",
    price_modificated: activityStore.globalPrice,
  });
  const isLoading = ref(false);
  const open = ref(false);

  const handleSave = async () => {
    isLoading.value = true;

    await saveDataOfCurrentActivity({
      ...newDebtor,
    });

    const data = await getDataOfCurrentActivity();
    if (data) {
      activityStore.setGlobalPrice(data.global_price);
      activityStore.setDebtorList(data.debtor_list);
    }

    isLoading.value = false;

    newDebtor.name = "";
    newDebtor.quantity = 0;
    newDebtor.delivered = false;
    newDebtor.cash = "dont-payment";
    newDebtor.price_modificated = activityStore.globalPrice;

    open.value = false;
  };
</script>

<template>
  <Button class="w-full" @click="open = true">Crear Deudor</Button>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[425px] top-[30%]">
      <DialogHeader>
        <DialogTitle>Crear Deudor</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
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
          :default-value="activityStore.globalPrice"
        />
      </div>
      <div>
        <RadioGroup :disabled="isLoading" v-model="newDebtor.cash" class="flex">
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
      <div class="flex items-center gap-2">
        <Label for="delivered">Entregado</Label>
        <Switch
          :disabled="isLoading"
          id="delivered"
          v-model="newDebtor.delivered"
        />
      </div>
      <DialogFooter>
        <Button @click="handleSave">
          {{ isLoading ? "Guardando.." : "Guardar Cambios" }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
