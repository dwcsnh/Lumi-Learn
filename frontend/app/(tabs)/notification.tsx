import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import NotificationItem from '@/components/Notification/NotificationItem';
import { Notification } from '@/types/notification';  
import { GetNotification, markAllNotificationsAsRead } from '@/api/notification';

const isToday = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showAllPrevious, setShowAllPrevious] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await GetNotification();
        setNotifications(response.data);  
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = (notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((n) => n.notificationId !== notificationId)
    );
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const todayNotifications = notifications.filter((n) => isToday(n.createdAt));
  const previousNotifications = notifications.filter((n) => !isToday(n.createdAt));
  const visiblePreviousNotifications = showAllPrevious
    ? previousNotifications
    : previousNotifications.slice(0, 10);

  return (
    <View className="flex-1 bg-white pt-10">
      <Text className="text-3xl font-bold text-center mb-4">Notifications</Text>

      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}>
        {todayNotifications.length > 0 && (
          <View className="w-[90%]">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xl font-semibold">Today</Text>
            <TouchableOpacity
              className="px-3 py-1 rounded-full"
              onPress={handleMarkAllAsRead}
            >
              <Text className="text-black font-medium text-sm">Mark all as read</Text>
            </TouchableOpacity>
          </View>
        
          {todayNotifications.map((notification) => (
            <NotificationItem
              key={notification.notificationId}
              notification={notification}
              onDelete={handleDelete}
            />
          ))}
        </View>
        )}

        {previousNotifications.length > 0 && (
          <View className="w-[90%] mt-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xl font-semibold">Earlier</Text>
            <TouchableOpacity
              className="px-3 py-1 rounded-full"
              onPress={handleMarkAllAsRead}
            >
              <Text className="text-black font-medium text-sm">Mark all as read</Text>
            </TouchableOpacity>
          </View>
        
          {visiblePreviousNotifications.map((notification) => (
            <NotificationItem
              key={notification.notificationId}
              notification={notification}
              onDelete={handleDelete}
            />
          ))}
        
          {previousNotifications.length > 10 && (
            <TouchableOpacity
              className="mt-2 self-center bg-black px-4 py-2 rounded-full"
              onPress={() => setShowAllPrevious(!showAllPrevious)}
            >
              <Text className="text-white font-semibold">
                {showAllPrevious ? 'Reduce' : 'See previous notification'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        )}
      </ScrollView>
    </View>
  );
};

export default NotificationPage;
