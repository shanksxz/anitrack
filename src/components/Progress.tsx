import { statusDistribution } from "@/types";

const statusColors: { [key: string]: string } = {
    CURRENT: "bg-[#68d639]",
    PLANNING: "bg-[#02a9ff]",
    PAUSED: "bg-[#9256f3]",
    DROPPED: "bg-[#f779a4]",
    COMPLETED: "bg-[#e85d75]",
};

const Progress = ({ status, amount, total }: { status: statusDistribution["status"], amount: number, total: number }) => {
    return (
        <div
            className={`h-full ${statusColors[status]} text-sm`}
            style={{ width: `${(amount / total) * 100}%` }}
        ></div>
    );
};

export default Progress;
