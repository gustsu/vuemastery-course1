var app = new Vue({
    el: '#app',
    data: {
        brand: 'Gabriel',
        product: 'Socks',
        selectedVariant: 0,
        link: 'https://www.gabrielbrand.com/collections/accesories',
        details: ['One size fits most', '100% Cotton'],
        variants: [
            {
                id: 1,
                color: '#ffffff',
                image: './assets/img/socks1.jpg',
                quantity: 10
            },
            {
                id: 2,
                color: '#0000ff',
                image: './assets/img/socks2.jpg',
                quantity: 0
            },
            {
                id: 3,
                color: '#fb7f00',
                image: './assets/img/socks3.jpg',
                quantity: 20
            }
        ],
        cart: 0
    }, 
    methods: {
        addToCart: function() {
            this.cart += 1
        },
        updateProduct: function(i) {
            this.selectedVariant = i
        }

    },
    computed: {
        title: function() {
            return this.brand + ' ' + this.product;
        },
        image: function() {
            return this.variants[this.selectedVariant].image;
        },
        inStock: function() {
            return this.variants[this.selectedVariant].quantity;
        }
    }
})