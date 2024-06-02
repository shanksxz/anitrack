import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


const SelectComp = ({ value, onValueChange, options, width, className } : { value?: string, width? : string ,onValueChange?: (value: string) => void, options: { value: string, label: string }[], className? : string}) => (
    <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={`${width} ${className} text-primary_text bg-secondary_bg border-[#3a434d] rounded-sm `}>
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