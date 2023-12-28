import {message, notification} from "antd";
import {getServerUrl} from "./configServer.js";
import axios from "axios";

export const NOTIFICATION_TYPE = {
    CONTACT: "contact",
    COMPANY: "company",
    USER:'user'
}
class NotificationService {
    messageError = (content) => message.error(content);

    messageSuccess = (content) => message.success(content);

    messageWarning = (content) => message.warning(content);

    messageInfo = (content) => message.info(content);

    messageLoading = (msg = "Envoi du fichier en cours...") => {
        const hide = message.loading(msg, 0);
        return hide;
    };

    notifyError = (content = "Une erreur est survenue, veuillez réessayer ultérieurement.", title = "Erreur") =>
        notification.error({
            description: content,
            message: title,
        });

    serverNotificationAdmin = (params) => {
        return axios.get(getServerUrl() + `/api/notifications/admin`, {params: params,});
    }

    serverNotificationCompany = (id, params) => {
        return axios.get(getServerUrl() + `/api/notifications/company/${id}`, {
            params: params,
        });
    }

    serverNotificationUser = (id, params) => {
        return axios.get(getServerUrl() + `/api/notifications/user/${id}`, {
            params: params,
        });
    }

    updateNotification = (id, datas, params) => {
        return axios.put(getServerUrl() + `/api/notifications/${id}`, datas, params);
    }

    deleteNotification = (id) => {
        return axios.delete(getServerUrl() + `/api/notifications/${id}`);
    }


    renderTitle = (type) => {
        switch (type) {
            case NOTIFICATION_TYPE.CONTACT:
                return 'contact.email';
            case NOTIFICATION_TYPE.COMPANY:
            case NOTIFICATION_TYPE.USER:
                return 'project.name';
        }
    }

    renderBody = (type) => {
        switch (type) {
            case NOTIFICATION_TYPE.CONTACT:
                return 'contact.body';
            case NOTIFICATION_TYPE.COMPANY:
            case NOTIFICATION_TYPE.USER:
                return 'body';
        }
    }
}

export default new NotificationService();
