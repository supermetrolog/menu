import axios from "axios";
import ErrorHandle from "./errors";
import SuccessHandler from "./success";

function getFormDataWithFiles(formdata1) {

    console.log(formdata1);
    let formdata = {...formdata1 };
    let FD = new FormData();
    if (!formdata.fileList) {
        FD.append('data', JSON.stringify(formdata));
        return FD;
    }
    for (let i = 0; i < formdata.fileList.length; i++) {
        FD.append("files[]", formdata.fileList[i]);
    }
    delete formdata.fileList;
    FD.append('data', JSON.stringify(formdata));
    return FD;
}
export default {
    async search(query = {}) {
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
    // async createCategory(formdata) {
    //     console.warn('CREATE');
    //     let url = "categories";
    //     let data = false;
    //     await axios
    //         .post(url, formdata)
    //         .then((Response) => {
    //             data = SuccessHandler.getData(Response);
    //         })
    //         .catch((e) => ErrorHandle.setError(e));
    //     return data;
    // },
    async createCategory(formdata) {
        const url = "categories";
        let data = false;
        formdata = getFormDataWithFiles(formdata);

        let config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        };
        await axios
            .post(url, formdata, config)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
                console.warn('Responce server: ', data);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },
    // async updateCategory(formdata) {
    //     console.warn('UPDATE');
    //     let url = "categories/" + formdata.id;
    //     let data = false;
    //     await axios
    //         .patch(url, formdata)
    //         .then((Response) => {
    //             data = SuccessHandler.getData(Response);
    //         })
    //         .catch((e) => ErrorHandle.setError(e));
    //     return data;
    // },
    async updateCategory(formdata) {
        console.warn('UPDATE');
        let url = "categories/" + formdata.id;
        let data = false;
        formdata = getFormDataWithFiles(formdata);

        let config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        };
        await axios
            .patch(url, formdata, config)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
                console.warn('Responce server: ', data);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },
    async ingredients() {
        let url = "products/ingredients";
        let data = false;
        await axios
            .get(url)
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
        let url = "sub-categories/" + formdata.id;
        let data = false;
        await axios
            .patch(url, formdata)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },
    async searchSubCategories(query = {}) {
        // if (expand === null) {
        //     expand = "subCategories.products.ingredients";
        // }
        query = new URLSearchParams(query).toString();
        let url = "sub-categories?" + query;
        let data = false;
        await axios
            .get(url)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },

    async createProduct(formdata) {
        console.warn('CREATE');
        let url = "products";
        let data = false;
        await axios
            .post(url, formdata)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },
    async updateProduct(formdata) {
        console.warn('UPDATE');
        let url = "products/" + formdata.id;
        let data = false;
        await axios
            .patch(url, formdata)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },
    async deleteProduct(id) {
        let url = "products/" + id;
        let data = false;
        await axios
            .delete(url)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },
    async deleteCategory(id) {
        let url = "categories/" + id;
        let data = false;
        await axios
            .delete(url)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },
    async deleteSubCategory(id) {
        let url = "sub-categories/" + id;
        let data = false;
        await axios
            .delete(url)
            .then((Response) => {
                data = SuccessHandler.getData(Response);
            })
            .catch((e) => ErrorHandle.setError(e));
        return data;
    },
}