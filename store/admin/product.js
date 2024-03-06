export const state = () => ({
    products: [],
    page: 1,
    //product
    product: {},
});

export const mutations = {
    SET_PRODUCTS_DATA(state, payload) {
        state.products = payload;
    },

    SET_PAGE(state, payload) {
        //set value state "page"
        state.page = payload;
    },

    SET_PRODUCT_DATA(state, payload) {
        // set value state "product"
        state.product = payload;
    },
};

export const actions = {
    getProductsData({ commit, state }, payload) {
        let search = payload ? payload : "";
        return new Promise((resolve, reject) => {
            this.$axios
                .get(`/api/admin/products?q=${search}&page=${state.page}`)
                .then((response) => {
                    commit("SET_PRODUCTS_DATA", response.data.data);
                    resolve();
                });
        });
    },

    //store product
    storeProduct({ dispatch, commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            //store to Rest API "/api/admin/products" with method "POST"
            this.$axios
                .post("/api/admin/products", payload)

            //success
            .then(() => {
                //dispatch action "getProductsData"
                dispatch("getProductsData");

                //resolve promise
                resolve();
            })

            //error
            .catch((error) => {
                reject(error);
            });
        });
    },

    //get detail product
    getDetailProduct({ commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            //get to Rest API "/api/admin/products/:id" with method "GET"
            this.$axios
                .get(`/api/admin/products/${payload}`)

            //success
            .then((response) => {
                //commit to mutation "SET_PRODUCT_DATA"
                commit("SET_PRODUCT_DATA", response.data.data);

                //resolve promise
                resolve();
            });
        });
    },

    //update product
    updateProduct({ dispatch, commit }, { productId, payload }) {
        //set promise
        return new Promise((resolve, reject) => {
            //store to Rest API "/api/admin/products/:id" with method "POST"
            this.$axios
                .post(`/api/admin/products/${productId}`, payload)

            //success
            .then(() => {
                //dispatch action "getProductsData"
                dispatch("getProductsData");

                //resolve promise
                resolve();
            })

            //error
            .catch((error) => {
                reject(error);
            });
        });
    },

    //destroy products
    destroyProduct({ dispatch, commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            //delete to Rest API "/api/admin/products/:id" with method "DELETE"
            this.$axios
                .delete(`/api/admin/products/${payload}`)

            //success
            .then(() => {
                //dispatch action "getProductsData"
                dispatch("getProductsData");

                //resolve promise
                resolve();
            });
        });
    },
};