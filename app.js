Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" />
        </div>
        <div class="product-info">
            <h1>{{title}}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else class="out-of-stock">Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            <ul>
            <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div v-for="(variant, index) in variants" 
                v-bind:key="variant.id"
                class="color-box"
                v-bind:style="{ backgroundColor: variant.color}"
                @mouseover="updateProduct(index)">
            </div>
            <button v-bind:disabled="!inStock"  v-bind:class="{ disabledButton: !inStock }" v-on:click="addToCart">Add to Cart</button>
        </div>
    </div>
    `,
    data: function(){
        return {
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
            ]
        }
    }, 
    methods: {
        addToCart: function() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateProduct: function(i) {
            this.selectedVariant = i
        }

    },
    computed: {
        title: function() {
            return this.brand + ' ' + this.product
        },
        image: function() {
            return this.variants[this.selectedVariant].image
        },
        inStock: function() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping: function() {
            return this.premium ? 'Free' : '$2.99'
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart: function(id) {
            this.cart.push(id)
        }
    }
})