"use client";

type Props = {
    percent: number;
    showLabel?: boolean;
};

export default function ProgressBar({ percent, showLabel = true }: Props) {
    const p = Math.max(0, Math.min(100, Number.isFinite(percent) ? percent : 0));

    return (
        <div
            className="relative w-full h-3 rounded-full
                bg-zinc-200/90 dark:bg-zinc-800/70
                ring-1 ring-black/10 dark:ring-white/10
                overflow-hidden"
        >
            {/* Fill */}
            <div
                className="
                    h-full rounded-full
                    transition-all duration-300 ease-out
                    bg-gradient-to-r from-green-400 to-green-600
                "
                style={{ width: `${p}%` }}
            />

            {/* Label (always visible) */}
            {showLabel && (
                <div className="absolute inset-0 grid place-items-center">
                    <span className="text-[11px] font-medium text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                        {p}%
                    </span>
                </div>
            )}
        </div>
    );
}
