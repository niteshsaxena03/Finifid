import { useEffect, useState } from "react";
import Header from "@/components/Navbar/header";
import NotificationComponent from "@/components/Notification/NotificationComponent";
import { useNavigate } from "react-router";
import { useFirebase } from "@/Firebase/firebaseContext.jsx";

function NotificationScreen({ data }) {
  const navigate = useNavigate();
  const { isLoggedIn, getUserDetailsByEmail } = useFirebase();
  const [notifications, setNotifications] = useState([]);
  const userEmail = data.email;

  // Check if user is logged in or not.
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      // Fetch user details including notifications
      const fetchNotifications = async () => {
        const userDetails = await getUserDetailsByEmail(userEmail);
        if (userDetails && userDetails.notifications) {
          // Reverse the notifications array to show latest first
          const reversedNotifications = [
            ...userDetails.notifications,
          ].reverse();
          setNotifications(reversedNotifications);
        }
      };
      fetchNotifications();
    }
  }, [isLoggedIn, navigate, getUserDetailsByEmail, userEmail]);

  return (
    <div>
      <Header notifications={false} />
      <div className="mainPage">
        <div className="heading">
          <h1>Notifications</h1>
        </div>
        <div>
          {notifications.map((notify, index) => (
            <NotificationComponent
              key={index}
              email={notify.email}
              action={notify.action}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationScreen;
