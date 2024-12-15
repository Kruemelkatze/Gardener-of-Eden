// Overlay all characters into a single character width
export default function OverlaidCharacters({ text }) {
    return (
        <span className="relative" style={{ marginRight: `${text.length}px` }}>
            {text.split('').map((char, index) => (
                <span key={index} className={`absolute top-0 ${index}`}
                    style={{ left: `${index * 0.05}rem` }}
                >{char}</span>
            ))}
        </span>
    )
}