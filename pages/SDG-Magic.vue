<template>
    <Page title="SDG-Magic" name="SDG-Magic-page">
        <MagicChallenge :challenge="this.challenge"/>
    </Page>
</template>

<script>
export default {
    data() {
        return {
            challenge: "SDGMagic"
        }
    }
}
</script>

<style>

</style>