import { statusDistribution } from "@/types";

type colors = {
    [key: string]: string;
};

const statusColors: colors = {
    CURRENT: "68d639",
    PLANNING: "02a9ff",
    PAUSED: "9256f3",
    DROPPED: "f779a4",
    COMPLETED: "e85d75",
};

const Status = ({
    status,
    amount,
}: {
    status: statusDistribution["status"];
    amount: number;
}) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <button
                className={`bg-[#${statusColors[status]}] p-2 text-sm text-white rounded-sm`}
            >
                {status}
            </button>
            <p style={{ color: `#${statusColors[status]}` }}>{amount}</p>
        </div>
    );
};

export default Status;
