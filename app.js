var app = new Vue({
    el: '#app',
    data: {
        product: 'Sherbert Socks',
        inStock: true,
        image: './assets/img/socks1.jpg',
        link: 'https://www.gabrielbrand.com/collections/accesories',
        details: ['One size fits most', '100% Cotton'],
        variants: [
            {
                id: 1,
                color: 'White',
                image: './assets/img/socks1.jpg'
            },
            {
                id: 2,
                color: 'Blue',
                image: './assets/img/socks2.jpg'
            }
        ],
        cart: 0
    }, 
    methods: {
        addToCart: function() {
            this.cart += 1;
        },
        updateProduct: function(variantImage) {
            this.image = variantImage
        }

    }
})