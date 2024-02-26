<template>
    <Page title="Kids Magic" name="Kids-Magic-page">
        <MagicChallenge :challenge="this.challenge"/>
    </Page>
</template>

<script>
export default {
    data() {
        return {
            challenge: "KidsMagic"
        }
    }
}
</script>

<style>

</style>