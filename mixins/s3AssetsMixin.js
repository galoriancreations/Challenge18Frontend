export default {
    computed: {
        s3AssetsGenerator() {
            return (imagePath) => {
                const startIndex = imagePath.indexOf('images');
                if (startIndex !== -1) {
                    return `${this.$root.$config.s3AssetsUrl}${imagePath.slice(startIndex)}`;
                }
                return `${this.$root.$config.s3AssetsUrl}${imagePath}`;
            };
        }
    }
}
