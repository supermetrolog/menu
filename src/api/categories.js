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
    }
}