import { followProfileToggle, Profile } from "@/api";
import { UserContext } from "@/contexts/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "./BaseButton";

const FollowProfile = ({
  profile,
  className,
}: {
  profile: Profile;
  className?: string | undefined;
}) => {
  const queryClient = useQueryClient();
  const userStore = useContext(UserContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: followProfileToggle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["profiles", profile.username],
      });
    },
  });

  if (userStore?.user?.username === profile.username) {
    return null;
  }

  const icon = profile.following ? "i-carbon-subtract" : "i-carbon-add";
  const label = profile.following ? "Unfollow" : "Follow";

  const toggleFollow = () => {
    if (!userStore?.isLoggedIn) {
      navigate("/login");
    }

    mutation.mutate(profile);
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
