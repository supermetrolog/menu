export const PriceType = {
    computed: {
        isSimplePrice() {
            return (
                this.product.price &&
                !this.product.price_old &&
                !this.product.price_from &&
                !this.product.price_to
            );
        },
        isSimplePriceWithOldPrice() {
            return (
                this.product.price &&
                this.product.price_old &&
                !this.product.price_from &&
                !this.product.price_to
            );
        },
        isRangePrice() {
            return (!this.product.price &&
                !this.product.price_old &&
                this.product.price_from &&
                this.product.price_to
            );
        },
    },
}
export const VoluemType = {
    computed: {
        isSimpleVoluem() {
            return (
                this.product.voluem &&
                !this.product.voluem_from &&
                !this.product.voluem_to
            );
        },
        isRangeVoluem() {
            return (!this.product.voluem &&
                this.product.voluem_from &&
                this.product.voluem_to
            );
        },
    },
}
export const WindowScrollManager = {
    data() {
        return {
            windowScrollTop: null,
        };
    },
    methods: {
        windowScrollPositionSave() {
            const windowScrollTop =
                typeof window.pageYOffset !== "undefined" ?
                window.pageYOffset :
                (
                    document.documentElement ||
                    document.body.parentNode ||
                    document.body
                ).scrollTop;
            this.$store.dispatch('SET_WINDOW_SCROLL_TOP', windowScrollTop)
        },
        windowScrollTo() {
            window.scrollTo(0, this.$store.getters.WINDOW_SCROLL_TOP);
        }
    }
}