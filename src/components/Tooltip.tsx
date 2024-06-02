import { Tooltip } from "react-tooltip";
const TooltipComp = ({ content,anchorSelect } : { content: string, anchorSelect: string }) => {
    return (
        <Tooltip
            anchorSelect={anchorSelect}
            place="left"
            content={content}
            style={{
                background: "black",
                color: "white",
                fontSize: "1rem",
                padding: "0.6rem",
                borderRadius: "0.2rem",
            }}
        />
    )
};

export default TooltipComp;