import { useState } from "react";

// import components
import PostInput from "./components/PostInput";
import PostCard from "./components/PostCard";

// user interface
interface UserInterface {
	id: number;
	name: string;
}

// record interface
interface RecordInterface {
	name: string;
	date: string
}

// users
const users: UserInterface[] = [
	{ id: 1, name: 'Samuel Jackson' },
	{ id: 2, name: 'Binoy David' },
	{ id: 3, name: 'Jackson' },
	{ id: 4, name: 'Selar' }
];

export default function App() {

	const [record, setRecord] = useState<RecordInterface[] | any>([]) // record state

	return (
		<div className="bg-black h-screen overflow-y-scroll flex items-center justify-center px-5 ">

			<div className="space-y-7 h-full py-5">
				<PostInput record={record} setRecord={setRecord} users={users} />

				{record && record.slice().reverse().map((row: any, index: any) => (
					<PostCard key={index} post={row} />
				))}

			</div>
		</div>
	)
} 