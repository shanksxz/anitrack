import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


const SelectComp = ({ value, onValueChange, options, width, className } : { value: string, width : string ,onValueChange: (value: string) => void, options: { value: string, label: string }[], className? : string}) => (
    <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={`p-2 ${width} ${className} text-primary_text bg-secondary_bg h-[40px] border-[#3a434d] rounded-sm `}>
            <SelectValue placeholder="Set Tab" />
        </SelectTrigger>
        <SelectContent>
            {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
        </SelectContent>
    </Select>
);


export default SelectComp;