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
    clearOneOfCurrentActivity,
    updateDataOfCurrentActivity,
  } from "@/services/db";
  import { useActivityStore } from "@/store";
  import { Debtor } from "@/interfaces";

  interface Props {
    debtor: Debtor;
    indexDebtor: number;
  }

  const model = defineModel<boolean>();
  const props = defineProps<Props>();

  const newDebtor = reactive<Debtor>({ ...props.debtor });
  const isLoading = ref(false);

  const activityStore = useActivityStore();

  const handleUpdate = async () => {
    isLoading.value = true;
    await updateDataOfCurrentActivity(
      activityStore.debtorList,
      { ...newDebtor },
      props.indexDebtor
    );
    activityStore.debtorList[props.indexDebtor] = { ...newDebtor };
    isLoading.value = false;
    model.value = false;
  };

  const handleDelete = async () => {
    isLoading.value = true;
    await clearOneOfCurrentActivity({ ...newDebtor });
    activityStore.debtorList.splice(props.indexDebtor, 1);
    isLoading.value = false;
    model.value = false;
  };
</script>

<template>
  <Dialog v-model:open="model">
    <DialogContent class="sm:max-w-[425px] top-[34%]">
      <DialogHeader>
        <DialogTitle>Editar Deudor</DialogTitle>
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
      <DialogFooter>
        <Button variant="secondary" @click="handleDelete">
          {{ isLoading ? "Eliminando.." : "Eliminar Deudor" }}
        </Button>
        <Button @click="handleUpdate"
          >{{ isLoading ? "Guardando.." : "Guardar Cambios" }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
