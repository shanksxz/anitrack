import { statusDistribution } from "@/types";
import Progress from "./Progress";
import Status from "./status";

const ScoreDistribution = ({ statusDistribution }: { statusDistribution: statusDistribution[] }) => {
    const total = statusDistribution.reduce((acc: number, curr: statusDistribution) => { return acc + curr.amount }, 0);
    return (
        <div className="bg-secondary_gray flex flex-col justify-center items-center rounded-sm">
            <div className="p-5 pb-2 flex justify-center items-center gap-2">
                {statusDistribution.map((status) => {
                    return (
                        <Status
                            key={status.status}
                            status={status.status}
                            amount={status.amount}
                        />
                    );
                })}
            </div>
            <div className="w-full h-2 flex bg-white rounded-sm">
                {statusDistribution.map((status) => {
                    return (
                        <Progress
                            key={status.status}
                            status={status.status}
                            amount={status.amount}
                            total={total}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ScoreDistribution;
