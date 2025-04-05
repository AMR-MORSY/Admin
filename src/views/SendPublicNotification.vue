<template>
  <div class="px-5">
    <Card class="max-w-screen-md mx-auto my-20">
      <template #header>
        <p
          class="text-xl font-extrabold mt-8 text-font-main-color w-full text-center font-Signika"
        >
          New Notification
        </p>
      </template>
      <template #content>
        <form
          id="invoice"
          @submit.prevent="submitNotification"
          enctype="multipart/form-data"
        >
          <div class="flex justify-evenly gap-1 flex-wrap">
            <div class="flex flex-col w-72 mt-1 shrink-0">
              <InputText
                fluid
                v-model="title"
                :invalid="v$.title.$errors.length > 0"
                id="title"
                placeholder="Title."
              />

              <div v-if="v$.title.$error">
                <validationErrorMessage :errors="v$.title.$errors" />
              </div>
            </div>
         

            <div class="flex flex-col w-72 mt-1 shrink-0">
              <InputText
                fluid
                v-model="slug"
                :invalid="v$.slug.$errors.length > 0"
                id="slug"
                placeholder="Slug"
              />

              <div v-if="v$.slug.$error">
                <validationErrorMessage :errors="v$.slug.$errors" />
              </div>
            </div>
            <div class="flex flex-col w-96 mt-1 shrink-0">
              <Textarea
                fluid
                v-model="message"
                autoResize rows="5" cols="30" 
                :invalid="v$.message.$errors.length > 0"
                id="message"
                placeholder="Message"
              />

              <div v-if="v$.message.$error">
                <validationErrorMessage :errors="v$.message.$errors" />
              </div>
            </div>
          </div>
          <div class="w-full flex justify-center mt-8">
            <Button
              class="block"
              severity="info"
              raised
              type="submit"
              label="Submit"
            />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import validationErrorMessage from "../components/Helpers/validationErrorMessage.vue";
import { required, requiredIf } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import Users from "../Api/Users";
import { useToast } from "primevue/usetoast";

const message = ref();
const title = ref();
const slug = ref();
const toast = useToast();

const rules = computed(() => ({
  message: {
    required: helpers.withMessage("message is required", required),
  },
  title: {
    required: helpers.withMessage("Title date is required", required),
  },
  slug: {
    required: helpers.withMessage("Slug No. is required", required),
  },
}));

const v$ = useVuelidate(rules, {
  message,
  slug,
  title,
});

const submitNotification = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  var data = {
    message: message.value,
    title: title.value,
    slug: slug.value,
  };

  Users.sendPublicNotification(data).then((response) => {
    if (response.data.success == true) {
      toast.add({
        severity: "success",
        summary: "success message",
        detail: "Notification is Published successfully",
        life: 4000,
      });
    }
  });
};
</script>
