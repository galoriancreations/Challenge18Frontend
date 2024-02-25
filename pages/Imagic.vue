<template>
    <Page title="Imagic" name="imagic-page">
        <MagicChallenge :challenge="this.challenge"/>
    </Page>
</template>

<script>
export default {
    data() {
        return {
            challenge: "Imagic"
        }
    }
}
</script>

<style>

</style>