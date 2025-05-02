import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Notification } from '@/types/notification';
import { deleteNotification, markNotificationAsRead } from '@/api/notification';

interface Props {
  notification: Notification;
  onDelete: (notificationId: string) => void;
}

const NotificationItem = ({ notification, onDelete }: Props) => {
  const createdAt = new Date(notification.createdAt);
  const timeAgo = createdAt.toLocaleString();

  const getIconName = () => {
    switch (notification.type) {
      case 'Quiz': return 'pencil-square-o';
      case 'FlashCardSet': return 'clone';
      default: return 'bell';
    }
  };

  const handlePress = async () => {
    if (!notification.isRead) {
      try {
        await markNotificationAsRead(notification.notificationId);
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNotification(notification.notificationId);
      onDelete(notification.notificationId);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className={`rounded-lg p-4 mb-3 ${notification.isRead ? 'bg-gray-200' : 'bg-white'} border border-gray-300`}>
        <View className="flex-row items-start gap-3">
          <FontAwesome name={getIconName()} size={24} color="#333" />
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-800">
              {notification.content}
            </Text>
            <View className="flex-row justify-between mt-2">
              <Text className="text-sm text-gray-500">{notification.type}</Text>
              <Text className="text-sm text-gray-500">{timeAgo}</Text>
            </View>
          </View>
          <TouchableOpacity className="ml-2 p-1 my-auto" onPress={handleDelete}>
            <FontAwesome name="trash" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;
