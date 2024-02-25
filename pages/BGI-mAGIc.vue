<template>
    <Page title="BGI-mAGIc" name="BGI-page">
        <MagicChallenge :challenge="this.challenge"/>
    </Page>
</template>

<script>
export default {
    data() {
        return {
            challenge: "BGIMagic"
        }
    }
}
</script>

<style>

</style>