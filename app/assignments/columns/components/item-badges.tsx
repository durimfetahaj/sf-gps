import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface Item {
  item: { name: string };
  quantity: number;
}

interface ItemBadgesProps {
  items: Item[];
  maxVisible?: number; // optional, default 3
}

export const ItemBadges: React.FC<ItemBadgesProps> = ({
  items,
  maxVisible = 3,
}) => {
  if (!items || items.length === 0) {
    return <span className="text-muted-foreground">None</span>;
  }

  const visibleItems = items.slice(0, maxVisible);
  const remainingCount = items.length - maxVisible;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-wrap gap-2 cursor-pointer">
          {visibleItems.map(({ item, quantity }, i) => (
            <Badge key={i} variant="default">
              {item.name} x{quantity}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge variant="outline" className="text-muted-foreground">
              +{remainingCount} more
            </Badge>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs">
        <ul className="list-disc ml-4 space-y-1">
          {items.map(({ item, quantity }, i) => (
            <li key={i}>
              {item.name} x{quantity}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
