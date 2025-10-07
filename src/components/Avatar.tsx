export const Avatar = ({
  user,
}: {
  user: { username: string } | undefined | null;
}) => {
  return (
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
      <span className="text-gray-600 font-bold">
        {user?.username?.charAt(0)?.toUpperCase()}
      </span>
    </div>
  );
};
