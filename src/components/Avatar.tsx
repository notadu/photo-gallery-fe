export const Avatar = ({user}: {user: {name: string} | undefined | null} ) => {
    return <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-bold">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
}