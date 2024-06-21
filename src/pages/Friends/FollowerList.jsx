import FriendComponent from "@/components/Friend/FriendComponent"

function FollowerList({ followers }) {
  return (
    <div>
      {followers.map((follower, index) => (
        <FriendComponent
          key={index}
          name={follower.name}
          about={follower.about}
          image={follower.image}
        />
      ))}
    </div>
  );
}

export default FollowerList;
