import api from "./api";

const URL_PREFIX = 'api/Notifications';

export function GetNotification() {
  return api.get(`${URL_PREFIX}`);
}

export function deleteNotification(notificationId: string) {
  return api.delete(`${URL_PREFIX}/${notificationId}`);
}

export function markNotificationAsRead(notificationId: string) {
  return api.patch(`${URL_PREFIX}/${notificationId}/read`);
}

export function markAllNotificationsAsRead() {
  return api.patch(`${URL_PREFIX}/read-all`);
}
