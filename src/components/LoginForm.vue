<script setup lang="ts">
  import { reactive, type HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent, CardHeader } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { signIn } from "@/services/auth";
  import { useRouter } from "vue-router";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();
  const router = useRouter();

  const credentials = reactive({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    const user = await signIn({ ...credentials });
    console.log(user);
    router.push({ path: "/presupuestos" });
  };
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <img
          class="w-32 mx-auto"
          src="/logo-papa-rellena.png"
          alt="Logo Grupo Joel"
        />
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSignIn">
          <div class="flex flex-col gap-6">
            <div class="grid gap-3">
              <Label for="email">Correo</Label>
              <Input
                required
                id="email"
                type="email"
                v-model="credentials.email"
                placeholder="joel@gmail.com"
              />
            </div>
            <div class="grid gap-3">
              <Label for="password">Contraseña</Label>
              <Input
                required
                id="password"
                type="password"
                placeholder="******"
                v-model="credentials.password"
              />
            </div>
            <div class="flex flex-col gap-3">
              <Button type="submit" class="w-full"> Ingresar </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
