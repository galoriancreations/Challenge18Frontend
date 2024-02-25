<template>
    <Page title="Moral Magic" name="Moral-Magic-page">
        <MagicChallenge :challenge="this.challenge"/>
    </Page>
</template>

<script>
export default {
    data() {
        return {
            challenge: "MoralMagic"
        }
    }
}
</script>

<style>

</style>