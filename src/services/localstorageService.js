import secureLocalStorage from "react-secure-storage";

export const UTILS_APP = {
    APP_NAME: "SPOTINFO",
    STORE: 'STORE',
    TOKEN: "token",
    USER: "user",
    ROLES: {
        ADMIN: "admin",
        EDITEUR: "editeur",
    },
    MODAL_DEFAULT_SIZE: 700,
    DEFAULT_PAGE_SIZE: 100,
    DEFAULT_PAGINATION_CONFIG: {
        pageSize: 100,
        showSizeChanger: false,
    },
    DEFAULT_TABLE_CONFIG: {
        className: "overflow-x-auto"
    },
    ADMIN_FILTER: 'admin_filter',
    ADMIN_FILTER_INTERVENANT: 'admin_filter_intervenant',

    USER_FILTER: 'user_filter',
    USER_FILTER_INTERVENANT: 'user_filter_intervenant',
    APP_MODE:{
        DEV:'DEV',
        PROD:'PROD'
    }
};


class LocalstorageService {
    encode = (key) => btoa(UTILS_APP.APP_NAME + "_" + key);
    set = (key, value) =>
        secureLocalStorage.setItem(this.encode(key), JSON.stringify(value));
        
    get = (key) =>
        secureLocalStorage.getItem(this.encode(key))
            ? JSON.parse(secureLocalStorage.getItem(this.encode(key)))
            : null;

    remove = (key) => secureLocalStorage.removeItem(this.encode(key));

    clear = () => secureLocalStorage.clear();
}

export default new LocalstorageService();