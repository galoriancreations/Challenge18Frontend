<template>
  <form class="form" @submit.prevent="submitHandler">
    <div class="form__field">
      <label for="name" class="form__label">Name</label>
      <input
        v-model="formData.name"
        id="name"
        name="name"
        placeholder="Your name"
        required
        class="form__input"
      />
    </div>
    <div class="form__field">
      <label for="email" class="form__label">
        Email
      </label>
      <input
        v-model="formData.email"
        id="email"
        name="email"
        placeholder="Your email address"
        type="email"
        required
        class="form__input"
      />
    </div>
    <div class="form__field">
      <label for="phone" class="form__label">Phone</label>
      <input
        v-model="formData.phone"
        id="phone"
        name="phone"
        type="tel"
        required
        placeholder="Your phone number "
        class="form__input"
      />
    </div>
    <div class="form__field">
      <label for="organization" class="form__label"
        >Organization (optional)</label
      >
      <input
        v-model="formData.organization"
        id="organization"
        name="organization"
        placeholder="Your organization"
        class="form__input"
      />
    </div>
    <div class="form__field">
      <label for="role" class="form__label">Role (optional)</label>
      <input
        v-model="formData.role"
        id="role"
        name="role"
        placeholder="Your role in the organization"
        class="form__input"
      />
    </div>
    <div class="form__field">
      <label for="subject" class="form__label">Subject</label>
      <input
        v-model="formData.subject"
        id="subject"
        name="subject"
        required
        placeholder="Subject of your message"
        class="form__input"
      />
    </div>
    <div class="form__field">
      <label for="message" class="form__label">Message</label>
      <textarea
        v-model="formData.message"
        id="message"
        name="message"
        required
        placeholder="Leave your message here"
        class="form__input form__textarea"
      />
    </div>
    <BaseButton variant="blue">Submit</BaseButton>
  </form>
</template>

<script>
export default {
  inject: ["sendMessage"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        phone: "",
        organization: "",
        role: "",
        subject: "",
        message: ""
      }
    };
  },
  methods: {
    async submitHandler(event) {
      const success = await this.sendMessage(event.target);
      if (success) {
        this.resetForm();
      }
    },
    resetForm() {
      for (let key in this.formData) {
        this.formData[key] = "";
      }
    }
  }
};
</script>
