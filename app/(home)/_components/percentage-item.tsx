import { ReactNode } from "react";

interface PercentageItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}

const PercenageItem = ({ icon, title, value }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* ICONE */}
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-semibold text-muted-foreground">{title}</p>
      </div>
      {/* PORCENTAGEM */}
      <p className="font-bold">{value}%</p>
    </div>
  );
};

export default PercenageItem;
