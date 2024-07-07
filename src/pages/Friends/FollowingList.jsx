import FriendComponent from "@/components/Friend/FriendComponent"


function FollowingList({ following }) {
  return (
    <div>
      {following.map((follow, index) => (
        <FriendComponent
          key={index}
          name={follow.name}
          about={follow.profession}
          image={follow.image}
          email ={follow.email}
        />
      ))}
    </div>
  );
}

export default FollowingList;
