import { useState } from "react";

// user interface
interface UserInterface {
    id: number;
    name: string;
}

// dropdown interface
interface DropdownInterfaceProps {
    isOpen: boolean
    insertName: (name: string) => void
    users: UserInterface[]
    setIsOpen: (e: any) => void
}

const MentionDropdown = ({ isOpen, insertName, users, setIsOpen }: DropdownInterfaceProps) => {

    const [searchTerm, setSearchTerm] = useState(""); // search state

    // Filter options based on search query
    const filteredOptions: any = users.filter((option: any) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={` mt-1 w-full flex justify-center absolute z-10 ${isOpen ? "block" : "hidden"}`}>
            <div className="bg-white border border-gray-300 rounded-md shadow-lg w-52 p-2 space-y-4">
                <div className="relative">
                    <input className="border w-full border-gray-500 rounded-md px-2 py-1"
                        placeholder="search ..."
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.preventDefault()}
                    />
                    {searchTerm !== "" && (
                        <a className="absolute right-3 top-1 cursor-pointer" onClick={() => setSearchTerm('')}>X</a>
                    )}
                </div>
                <div className="space-y-1">
                    {filteredOptions && filteredOptions.map((row: any, index: any) => {
                        const userShortName: string = (row.name.substring(0, 1)).toUpperCase()
                        return (
                            <a key={index} className="flex gap-x-2 items-center px-1 cursor-pointer hover:bg-slate-200 py-2" onClick={() => {
                                insertName(row.name)
                                setIsOpen(false)
                            }}>
                                <p className={`w-7 h-7 ${index % 2 == 0 ? "bg-green-500" : "bg-rose-400"}  text-white rounded-full flex items-center justify-center`}>{userShortName}</p>
                                <p className="text-sm font-medium">{row.name}</p>
                            </a>
                        )
                    })}

                    {filteredOptions.length === 0 && (
                        <p className="text-gray-500 text-center py-2">No results found.</p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default MentionDropdown;