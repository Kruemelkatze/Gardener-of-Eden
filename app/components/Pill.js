
const grayscaleStyle = {
    filter: 'grayscale(1)',
    opacity: 1,
    contrast: 1,
    brightness: 0,
};

export const Pill = ({ icon, children, title, bgColor }) => {
    return (
        <div className={`rounded-full px-3 py-1 m-1 ${bgColor} text-lg rounded`} title={title} style={{maxHeight: '38.4px'}}>
            {icon && <span style={grayscaleStyle} className="">{icon}</span>}
            {children}
        </div>
    );
}
