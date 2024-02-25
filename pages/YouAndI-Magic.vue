<template>
    <Page title="You And I Magic" name="YouAndI-Magic-page">
        <MagicChallenge :challenge="this.challenge"/>
    </Page>
</template>

<script>
export default {
    data() {
        return {
            challenge: "UnIMagic"
        }
    }
}

</script>

<style>

</style>