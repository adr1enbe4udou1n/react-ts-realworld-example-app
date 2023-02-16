import { followProfile, Profile, unfollowProfile } from "@/api";
import { UserContext } from "@/contexts/user";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "./BaseButton";

const FollowProfile = ({
  profile,
  className,
  onFollow,
}: {
  profile: Profile;
  className?: string | undefined;
  onFollow?: (following: boolean) => void;
}) => {
  const userStore = useContext(UserContext);
  const navigate = useNavigate();

  if (userStore?.user?.username === profile.username) {
    return null;
  }

  const icon = profile.following ? "i-carbon-subtract" : "i-carbon-add";
  const label = profile.following ? "Unfollow" : "Follow";

  const toggleFollow = async () => {
    if (!userStore?.isLoggedIn) {
      navigate("/login");
    }

    if (profile.following) {
      await unfollowProfile({ username: profile.username });
      if (onFollow) {
        onFollow(false);
      }
      return;
    }

    await followProfile({ username: profile.username });
    if (onFollow) {
      onFollow(true);
    }
  };

  return (
    <BaseButton
      className={className}
      type="button"
      size="sm"
      variant="secondary"
      onClick={toggleFollow}
    >
      <i className={icon} />
      {`${label} ${profile.username}`}
    </BaseButton>
  );
};

export default FollowProfile;
