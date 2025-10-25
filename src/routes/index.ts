import CreateDebtor from "@/pages/CreateDebtor.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Numbers from "@/pages/Numbers.vue";
import { getCurrentUser } from "@/services/auth";
import { createRouter, createWebHistory } from "vue-router";
import UpdateDebtor from "@/pages/UpdateDebtor.vue";

export const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      beforeEnter: async () => {
        const currentUser = await getCurrentUser();
        if (currentUser)
          return {
            name: "home",
          };
        return true;
      },
      component: Login,
    },
    {
      path: "/",
      name: "app-layout",
      beforeEnter: async () => {
        const currentUser = await getCurrentUser();
        if (currentUser) return true;
        return {
          name: "login",
        };
      },
      component: AppLayout,
      children: [
        {
          path: "",
          name: "redirect-home",
          redirect: "presupuestos",
        },
        {
          path: "presupuestos",
          name: "home",
          component: Home,
        },
        {
          path: "crear-deudor",
          name: "create-debtor",
          component: CreateDebtor,
        },
        {
          path: "actualizar-deudor/:index",
          name: "update-debtor",
          component: UpdateDebtor,
        },
        {
          path: "numeros",
          name: "numbers",
          component: Numbers,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "login",
    },
  ],
});
