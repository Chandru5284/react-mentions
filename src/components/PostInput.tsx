import { useEffect, useRef, useState } from 'react'

// import components
import MentionDropdown from './MentionDropdown';

// user interface
interface UserInterface {
    id: number;
    name: string;
}

// post interface
interface PostInputInterfaceProps {
    record: []
    setRecord: (e: any) => void;
    users: UserInterface[]
}

const PostInput = ({ record, setRecord, users }: PostInputInterfaceProps) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // dropdown visibility state
    const [textareaValue, setTextareaValue] = useState(''); // textarea state
    const textareaRef: any = useRef(null); // textarea ref

    // Function to insert name
    const insertName = (name: any) => {

        // Get the current cursor position
        const cursorPosition = textareaRef.current.selectionStart;

        // Split the textarea value into two parts: before and after the cursor position
        const textBeforeCursor = textareaValue.substring(0, cursorPosition);
        const textAfterCursor = textareaValue.substring(cursorPosition);

        // Update the textarea value by inserting the name at the cursor position
        setTextareaValue(textBeforeCursor + name + textAfterCursor);

        // Move the cursor after the inserted name
        const newCursorPosition = cursorPosition + name.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
    };

    // Function to handle backspace
    const handleBackspace = (e: any) => {

        // Get the current cursor position
        const cursorPosition = textareaRef.current.selectionStart;

        for (let { name } of users) {
            if (
                e.keyCode === 8 && // Backspace key
                textareaValue.substring(cursorPosition - name.length, cursorPosition) === name // Cursor at the beginning of a name
            ) {
                // Delete the entire word
                const textBeforeCursor = textareaValue.substring(0, cursorPosition - name.length);
                const textAfterCursor = textareaValue.substring(cursorPosition);
                setTextareaValue(textBeforeCursor + textAfterCursor);

                // Move the cursor back
                textareaRef.current.setSelectionRange(cursorPosition - name.length, cursorPosition - name.length);
                e.preventDefault();
                return;
            }
        }
    }

    useEffect(() => {

        const handleKeyDown = (event: any) => {
            if (event.key === "@" && event.shiftKey) {
                setIsDropdownOpen(true);
            }

            if (event.keyCode === 8 || event.keyCode === 32) {
                setIsDropdownOpen(false);
            }

        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const onFormSubmit = (e: any) => {
        e.preventDefault();

        if (!isDropdownOpen) {
            if (record) {
                setRecord([...record, { message: textareaValue, date: new Date() }]);
            }
            else {
                setRecord([{ message: textareaValue, date: new Date() }]);
            }
        }

        setTextareaValue('')

    }

    return (
        <form className="space-y-3" onSubmit={onFormSubmit}>
            <div className="relative">
                <textarea
                    className="px-6 py-3 bg-gray-50 rounded-md w-full"
                    placeholder="Create a post ..."
                    cols={70}
                    rows={3}
                    ref={textareaRef}
                    value={textareaValue}
                    onKeyDown={handleBackspace}
                    onChange={(e) => setTextareaValue(e.target.value)}>
                </textarea>
                <MentionDropdown
                    isOpen={isDropdownOpen}
                    setIsOpen={setIsDropdownOpen}
                    insertName={insertName}
                    users={users}
                />
            </div>
            <div className="flex justify-end">
                <button className="font-bold bg-violet-500 px-8 py-1.5 rounded-md">Post</button>
            </div>
        </form>
    )
}

export default PostInput
