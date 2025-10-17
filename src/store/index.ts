import { Debtor } from "@/interfaces";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useActivityStore = defineStore("activityStore", () => {
  const globalPrice = ref<number>(0);
  const debtorList = ref<Debtor[]>([]);
  const isLoadingData = ref<boolean>(true);
  const totalTurrones = 40;

  const countNoPayments = computed(
    () =>
      debtorList.value.filter((debtor) => debtor.cash === "dont-payment").length
  );

  const totalYape = computed(() =>
    debtorList.value.reduce((acc, debtor) => {
      if (debtor.cash === "yape" && debtor.price_modificated)
        return acc + debtor.quantity * debtor.price_modificated;
      return acc;
    }, 0)
  );

  const totalCash = computed(() =>
    debtorList.value.reduce((acc, debtor) => {
      if (debtor.cash === "cash" && debtor.price_modificated)
        return acc + debtor.quantity * debtor.price_modificated;
      return acc;
    }, 0)
  );

  const totalDontPayment = computed(() =>
    debtorList.value.reduce((acc, debtor) => {
      if (debtor.cash === "dont-payment" && debtor.price_modificated)
        return acc + debtor.quantity * debtor.price_modificated;
      return acc;
    }, 0)
  );

  const totalSold = computed(() =>
    debtorList.value.reduce((acc, debtor) => {
      return acc + debtor.quantity;
    }, 0)
  );

  const total = computed(() => totalCash.value + totalYape.value);

  function setGlobalPrice(newGlobalPrice: number) {
    globalPrice.value = newGlobalPrice;
  }

  function setDebtorList(newDebtorList: Debtor[]) {
    debtorList.value = newDebtorList;
  }

  function setIsLoadingData(newIsLoadingData: boolean) {
    isLoadingData.value = newIsLoadingData;
  }

  return {
    globalPrice,
    debtorList,
    isLoadingData,
    countNoPayments,
    totalYape,
    totalTurrones,
    totalSold,
    totalCash,
    totalDontPayment,
    total,
    setIsLoadingData,
    setGlobalPrice,
    setDebtorList,
  };
});
