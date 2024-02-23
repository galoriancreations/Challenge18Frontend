export default {
    computed: {
        s3AssetsGenerator() {
            return (imagePath) => {
                return `${this.$root.$config.s3AssetsUrl}${imagePath}`;
            };
        }
    }
}
