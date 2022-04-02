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

export const BodyScrollLocked = {
    data() {
        return {
            locked: false,
            bodyScrollTop: null,
        };
    },
    methods: {
        bodyScrollLocked() {
            let body = document.getElementsByTagName("body")[0];
            if (!this.locked) {
                this.bodyScrollTop =
                    typeof window.pageYOffset !== "undefined" ?
                    window.pageYOffset :
                    (
                        document.documentElement ||
                        document.body.parentNode ||
                        document.body
                    ).scrollTop;
                console.log(this.bodyScrollTop);
                console.log(window.pageYOffset);
                console.log(document.documentElement.scrollTop);
                console.log(document.body.parentNode.scrollTop);
                console.log(document.body.scrollTop);
                body.classList.add("scroll-locked");
                this.locked = true;
            }
        },
        bodyScrollUnLocked() {
            let body = document.getElementsByTagName("body")[0];
            if (this.locked) {
                body.classList.remove("scroll-locked");
                body.style.top = null;
                window.scrollTo(0, this.bodyScrollTop);
                this.locked = false;
            }
        }
    }
}