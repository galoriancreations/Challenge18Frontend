<template>
  <Page title="Register" name="register">
    <RegisterNote>
      Free registration is currently available for individual users only. To
      join us as an organization, you can
      <RouterLink to="/membership">become a premium member</RouterLink>.
    </RegisterNote>
    <RegistrationForm />
  </Page>
</template>

<script>
export default {
  meta: {
    forLoggingIn: true
  }
};
</script>
