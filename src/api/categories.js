import axios from "axios";
import ErrorHandle from "./errors";
import SuccessHandler from "./success";

export default {
    async search(query = {}) {
        // if (expand === null) {
        //     expand = "subCategories.products.ingredients";
        // }
        query = new URLSearchParams(query).toString();
        let url = "categories?" + query;
        let data = false;
        await axios
            .get(url)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },
    async createCategory(formdata) {
        console.warn('CREATE');
        let url = "categories";
        let data = false;
        await axios
            .post(url, formdata)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },
    async updateCategory(formdata) {
        console.warn('UPDATE');
        let url = "categories";
        let data = false;
        await axios
            .patch(url, formdata)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },
    async createSubCategory(formdata) {
        console.warn('CREATE');
        let url = "sub-categories";
        let data = false;
        await axios
            .post(url, formdata)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },
    async updateSubCategory(formdata) {
        console.warn('UPDATE');
        let url = "sub-categories";
        let data = false;
        await axios
            .patch(url, formdata)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },
}