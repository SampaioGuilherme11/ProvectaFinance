"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation"; // Importando useSearchParams para pegar o parâmetro 'month'

const MOUNTH_OPTIONS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const TimeSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const urlMonth = searchParams.get("month");
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");

  const selectedMonth = urlMonth || currentMonth;

  const handleMonthChange = (month: string) => {
    push(`/?month=${month}`);
  };

  return (
    <Select
      value={selectedMonth}
      onValueChange={(value) => handleMonthChange(value)}
    >
      <SelectTrigger className="w-[120px] rounded-full">
        <SelectValue placeholder="Mês" />
      </SelectTrigger>
      <SelectContent>
        {MOUNTH_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimeSelect;
