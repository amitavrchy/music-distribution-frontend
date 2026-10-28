import { X } from "lucide-react";

const notifications = [
  {
    id: 1,
    message: "New Order #12345 Placed",
    datetime: "July 17, 2025 | 09:15 AM",
  },
  {
    id: 2,
    message: "Order #12347 – Delivered",
    datetime: "July 17, 2025 | 09:15 AM",
  },
  {
    id: 3,
    message: "Payment Received for Order #12345",
    datetime: "July 17, 2025 | 09:15 AM",
  },
  {
    id: 4,
    message: "Refund Processed for Order #12347",
    datetime: "July 17, 2025 | 09:15 AM",
  },
  {
    id: 5,
    message: "Delivery Rider Assigned for Order #12345",
    datetime: "July 17, 2025 | 09:15 AM",
  },
  {
    id: 6,
    message: "New Customer Registered",
    datetime: "July 17, 2025 | 09:15 AM",
  },
];

interface NotificationPanelProps {
  onClose: () => void;
}

export default function NotificationReuseable({
  onClose,
}: NotificationPanelProps) {
  return (
    <div className="w-full max-w-md bg-gradient-to-b from-[#0B1E22] to-[#112B2F] rounded-2xl shadow-2xl border border-[#2F4F4F] overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#3A5CFF]">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-[#3A5CFF]">
            Notifications
          </h2>
          <button onClick={onClose} className="cursor-pointer">
            <X className="w-5 h-5 text-gray-300 hover:text-red-500 transition-colors duration-200" />
          </button>
        </div>
        <p className="text-sm text-gray-300 px-4 pb-3">
          You have{" "}
          <span className="font-semibold text-white">
            {notifications.length}
          </span>{" "}
          notifications today
        </p>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-[#3A5CFF]/30 max-h-96 overflow-y-auto">
        {notifications.map((notif, index) => (
          <div
            key={notif.id}
            className="px-4 py-3 space-y-1 text-sm hover:bg-[#1A3B44] transition-colors duration-200 rounded-lg"
          >
            <p className="text-white font-medium">
              {index + 1}. {notif.message}
            </p>
            <p className="text-gray-400 text-xs">
              Date & Time: {notif.datetime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// // src/components/NotificationPanel.tsx
// import { X, Check, Trash2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { format } from "date-fns";
// import {
//   useDeleteNotificationMutation,
//   useGetNotificationsQuery,
//   useMarkNotificationAsReadMutation,
// } from "@/redux/features/auth/notificationApi";

// interface NotificationPanelProps {
//   onClose: () => void;
// }

// export default function NotificationReuseable({ onClose }: NotificationPanelProps) {
//   const navigate = useNavigate();
//   const {
//     data: notificationsResponse,
//     isLoading,
//     isError,
//   } = useGetNotificationsQuery();
//   const [markAsRead] = useMarkNotificationAsReadMutation();
//   const [deleteNotification] = useDeleteNotificationMutation();

//   const notifications = notificationsResponse?.data || [];

//   const handleNotificationClick = async (notification: {
//     id: string;
//     parcelId: string;
//     isRead: boolean;
//   }) => {
//     try {
//       // Mark as read if not already read
//       if (!notification.isRead) {
//         await markAsRead(notification.id);
//       }

//       // Navigate to parcel details page
//       navigate(`/super-admin-dashboard/parcels/${notification.parcelId}`);
//       onClose();
//     } catch (error) {
//       console.error("Error handling notification click:", error);
//     }
//   };

//   const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     try {
//       await markAsRead(id);
//     } catch (error) {
//       console.error("Failed to mark notification as read:", error);
//     }
//   };

//   const handleDeleteNotification = async (id: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     try {
//       await deleteNotification(id);
//     } catch (error) {
//       console.error("Failed to delete notification:", error);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     try {
//       const date = new Date(dateString);
//       return format(date, "MMMM d, yyyy | hh:mm a");
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return dateString;
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
//         <div className="p-4">Loading notifications...</div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
//         <div className="p-4 text-red-500">Error loading notifications</div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
//       <div className="border-b border-[#E9EAEB]">
//         <div className="flex items-center justify-between p-4">
//           <h2 className="text-lg font-semibold text-blue-600">Notifications</h2>
//           <button onClick={onClose} className="cursor-pointer">
//             <X className="w-5 h-5 text-white hover:text-red-500" />
//           </button>
//         </div>
//         <p className="text-sm text-white px-4 pt-2 pb-3">
//           You have {notifications.length} unread notifications
//         </p>
//       </div>

//       <div className="divide-y divide-[#B2DDFF] max-h-96 overflow-y-auto">
//         {notifications.length === 0 ? (
//           <div className="p-4 text-center text-white">
//             No notifications available
//           </div>
//         ) : (
//           notifications.map((notif, index) => (
//             <div
//               key={notif.id}
//               className={`px-4 py-3 space-y-1 text-sm cursor-pointer ${
//                 notif.isRead ? "bg-gray-50" : "bg-blue-50"
//               }`}
//               onClick={() => handleNotificationClick(notif)}
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p
//                     className={`font-medium ${
//                       notif.isRead ? "text-white" : "text-blue-700"
//                     }`}
//                   >
//                     {index + 1}. {notif.title}
//                   </p>
//                   <p className="text-white">
//                     Date & Time: {formatDate(notif.createdAt)}
//                   </p>
//                 </div>
//                 <div className="flex space-x-2">
//                   {!notif.isRead && (
//                     <button
//                       onClick={(e) => handleMarkAsRead(notif.id, e)}
//                       className="text-green-600 hover:text-green-800"
//                       title="Mark as read"
//                     >
//                       <Check className="w-4 h-4" />
//                     </button>
//                   )}
//                   <button
//                     onClick={(e) => handleDeleteNotification(notif.id, e)}
//                     className="text-red-500 hover:text-red-700 cursor-pointer"
//                     title="Delete notification"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// // components/NotificationPanel.tsx
// import { X } from "lucide-react";

// import { useNavigate } from "react-router-dom";
// import { format } from "date-fns";
// import { Trash2 } from "lucide-react";
// import { Check } from "lucide-react";
// import {
//   useDeleteNotificationMutation,
//   useGetNotificationsQuery,
//   useMarkNotificationAsReadMutation,
// } from "@/redux/features/auth/notificationApi";

// interface NotificationPanelProps {
//   onClose: () => void;
// }

// export default function NotificationPanel({ onClose }: NotificationPanelProps) {
//   const navigate = useNavigate();
//   const {
//     data: notificationsResponse,
//     isLoading,
//     isError,
//   } = useGetNotificationsQuery();
//   const [markAsRead] = useMarkNotificationAsReadMutation();
//   const [deleteNotification] = useDeleteNotificationMutation();

//   const notifications = notificationsResponse?.data || [];

//   const handleNotificationClick = async (notification: {
//     id: string;
//     parcelId: string;
//     isRead: boolean;
//   }) => {
//     if (!notification.isRead) {
//       try {
//         await markAsRead(notification.id);
//       } catch (error) {
//         console.error("Failed to mark notification as read:", error);
//       }
//     }
//     navigate(`/parcels/${notification.parcelId}`);
//     onClose();
//   };

//   const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     try {
//       await markAsRead(id);
//     } catch (error) {
//       console.error("Failed to mark notification as read:", error);
//     }
//   };

//   const handleDeleteNotification = async (id: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     try {
//       await deleteNotification(id);
//     } catch (error) {
//       console.error("Failed to delete notification:", error);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     try {
//       const date = new Date(dateString);
//       return format(date, "MMMM d, yyyy | hh:mm a");
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return dateString;
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
//         <div className="p-4">Loading notifications...</div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
//         <div className="p-4 text-red-500">Error loading notifications</div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
//       <div className="border-b border-[#E9EAEB]">
//         <div className="flex items-center justify-between p-4">
//           <h2 className="text-lg font-semibold text-blue-600">Notifications</h2>
//           <button onClick={onClose} className="cursor-pointer">
//             <X className="w-5 h-5 text-white hover:text-red-500" />
//           </button>
//         </div>
//         <p className="text-sm text-white px-4 pt-2 pb-3">
//           You have {notifications.length} unread notifications
//         </p>
//       </div>

//       <div className="divide-y divide-[#B2DDFF] max-h-96 overflow-y-auto">
//         {notifications.length === 0 ? (
//           <div className="p-4 text-center text-white">
//             No notifications available
//           </div>
//         ) : (
//           notifications.map((notif, index) => (
//             <div
//               key={notif.id}
//               className={`px-4 py-3 space-y-1 text-sm cursor-pointer ${
//                 notif.isRead ? "bg-gray-50" : "bg-blue-50"
//               }`}
//               onClick={() => handleNotificationClick(notif)}
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p
//                     className={`font-medium ${
//                       notif.isRead ? "text-white" : "text-blue-700"
//                     }`}
//                   >
//                     {index + 1}. {notif.title}
//                   </p>
//                   <p className="text-white">
//                     Date & Time: {formatDate(notif.createdAt)}
//                   </p>
//                 </div>
//                 <div className="flex space-x-2">
//                   {!notif.isRead && (
//                     <button
//                       onClick={(e) => handleMarkAsRead(notif.id, e)}
//                       className="text-green-600 hover:text-green-800"
//                       title="Mark as read"
//                     >
//                       <Check className="w-4 h-4" />
//                     </button>
//                   )}
//                   <button
//                     onClick={(e) => handleDeleteNotification(notif.id, e)}
//                     className="text-red-500 hover:text-red-700 cursor-pointer"
//                     title="Delete notification"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// components/NotificationPanel.tsx
