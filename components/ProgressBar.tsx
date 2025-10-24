"use client";

type Props = {
    percent: number;
    showLabel?: boolean;
};

export default function ProgressBar({ percent, showLabel = true }: Props) {
    const p = Math.max(0, Math.min(100, Number.isFinite(percent) ? percent : 0));

    return (
        <div className="w-full">
            <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                <span>Явц</span>
                <span>{p}%</span>
            </div>

            <div className="w-full h-3 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-black dark:bg-white transition-all duration-500" style={{ width: `${p}%` }} />
            </div>
        </div>
    );
}
