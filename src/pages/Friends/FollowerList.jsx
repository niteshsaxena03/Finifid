import FriendComponent from "@/components/Friend/FriendComponent"

function FollowerList({ followers }) {
  return (
    <div>
      {followers.map((follower, index) => (
        <FriendComponent
          key={index}
          name={follower.name}
          about={follower.profession}
          image={follower.image}
          email = {follower.email}
        />
      ))}
    </div>
  );
}

export default FollowerList;
