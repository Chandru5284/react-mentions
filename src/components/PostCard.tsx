
// import utils
import { getTimeDifference } from "../utils/timeDifference"

// post props interface
interface PostInterfaceProps {
    post: {
        message: string;
        date: string;
    }
}

const PostCard = ({ post }: PostInterfaceProps) => {

    return (

        <div className="bg-gray-300 px-6 py-4 rounded-md space-y-10">
            <p className="text-gray-500">{post?.message}</p>

            <div className="border-t border-gray-400 pt-2 flex items-center gap-x-5">
                <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center">F</div>
                <div>
                    <p>Florance angle</p>
                    <p className="text-xs text-gray-500">{getTimeDifference(post?.date)}</p>
                </div>
            </div>
        </div>
    )
}

export default PostCard
