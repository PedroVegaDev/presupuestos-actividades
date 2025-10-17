import { ActivityResponse, Debtor } from "@/interfaces";
import { db } from "../lib/firebase";
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const turronesRef = doc(db, "activities", "turrones");

export const getDataOfCurrentActivity = async () => {
  try {
    const querySnapshot = await getDoc(turronesRef);
    return querySnapshot.data() as ActivityResponse;
  } catch (error) {
    console.error(error);
  }
};

export const saveDataOfCurrentActivity = async (data: Debtor) => {
  try {
    await updateDoc(turronesRef, {
      debtor_list: arrayUnion(data),
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateDataOfCurrentActivity = async (
  debtorList: Debtor[],
  debtorUpdated: Debtor,
  indexDebtorUpdated: number
) => {
  try {
    await updateDoc(turronesRef, {
      debtor_list: debtorList.map((debtor, index) =>
        index === indexDebtorUpdated ? debtorUpdated : debtor
      ),
    });
  } catch (error) {
    console.error(error);
  }
};

export const clearOneOfCurrentActivity = async (data: Debtor) => {
  try {
    await updateDoc(turronesRef, {
      debtor_list: arrayRemove(data),
    });
  } catch (error) {
    console.error(error);
  }
};
