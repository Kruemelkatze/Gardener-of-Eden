export function InfluenceBar({ title, bgColor, value, noValue = false, min = 0, max = 100, bgOnlyClass = "", highlight = false }) {
    // Simple Tailwind Progress Bar

    const fillPercentage = Math.min((value - min) / (max - min) * 100, 100);

    let lineBg = "bg-gray-600";
    if (highlight) {
        lineBg = "bg-red-600";
        bgColor = "bg-red-600";
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between">
                <div className={`text-sm`}>{title}</div>
                {!noValue && <div className="text-sm">{value}</div>}
            </div>
            {!bgOnlyClass && <div className={`w-full ${lineBg} rounded`}>
                <div className={`${bgColor} h-2 rounded`} style={{ width: `${fillPercentage}%` }}></div>
            </div>}
            {bgOnlyClass && <div className={`w-full ${lineBg} rounded`}>
                <div className={`${bgOnlyClass} h-2 rounded`} style={{ width: `${fillPercentage}%` }}></div>
            </div>}

        </div>
    );
}