
interface dropDownProps {
    list: Array<string>
}

export default function Dropdown({list}: dropDownProps) {
    return(
        <>
        <button>
            {list[0] || "Pick an option"}
            <ul 
            style={{
                position: "absolute",
                bottom: "0",
                left: "0",
            }}>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </button>
        </>
    )
}