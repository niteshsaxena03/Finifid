import FriendComponent from "@/components/Friend/FriendComponent"

function FollowingList({ following }) {
  return (
    <div>
      {following.map((follow, index) => (
        <FriendComponent
          key={index}
          name={follow.name}
          about={follow.about}
          image={follow.image}
        />
      ))}
    </div>
  );
}

export default FollowingList;
