
import Header from "@/components/Navbar/header";
import NotificationComponent from "@/components/Notification/NotificationComponent";
import { useNavigate } from "react-router";
import { useFirebase } from "@/Firebase/firebaseContext.jsx";
import { useEffect } from "react";

// Define the notification constant with 6 entries
const notification = [
  {
    id: "1",
    name: "Stark",
    image:
      "https://images.pexels.com/photos/7745573/pexels-photo-7745573.jpeg?auto=compress&cs=tinysrgb&w=1200",
    timestamp: "2024-06-19T08:30:00Z",
    read: false,
  },
  {
    id: "2",
    name: "Emily",
    image:
      "https://images.pexels.com/photos/5775887/pexels-photo-5775887.jpeg?auto=compress&cs=tinysrgb&w=1200",
    timestamp: "2024-06-18T10:15:00Z",
    read: false,
  },
  {
    id: "3",
    name: "James",
    image:
      "https://images.pexels.com/photos/7204273/pexels-photo-7204273.jpeg?auto=compress&cs=tinysrgb&w=1200",
    timestamp: "2024-06-17T14:45:00Z",
    read: true,
  },
  {
    id: "4",
    name: "Sophia",
    image:
      "https://images.pexels.com/photos/6205523/pexels-photo-6205523.jpeg?auto=compress&cs=tinysrgb&w=1200",
    timestamp: "2024-06-16T09:00:00Z",
    read: true,
  },
  {
    id: "5",
    name: "Michael",
    image:
      "https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg?auto=compress&cs=tinysrgb&w=1200",
    timestamp: "2024-06-15T11:20:00Z",
    read: false,
  },
  {
    id: "6",
    name: "Isabella",
    image:
      "https://images.pexels.com/photos/3851914/pexels-photo-3851914.jpeg?auto=compress&cs=tinysrgb&w=1200",
    timestamp: "2024-06-14T16:50:00Z",
    read: true,
  },
];

function NotificationScreen() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const { isLoggedIn } = useFirebase();

  // Check if user is logged in or not.
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);
  return (
    <div>
      <Header />
      <div className="mainPage">
        <div className="heading">
          <h1>Notifications</h1>
        </div>
        <div>
          {notification.map((notify) => (
            <NotificationComponent
              key={notify.id}
              name={notify.name}
              image={notify.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationScreen;
