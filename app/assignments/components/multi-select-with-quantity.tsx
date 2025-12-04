import { InventoryItem } from "@/app/generated/prisma";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Hash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface SelectedItem {
  itemId: string;
  quantity: number | "";
}

interface MultiSelectWithQuantityProps {
  options: InventoryItem[];
  value: SelectedItem[];
  onValueChange: (value: SelectedItem[]) => void;
  placeholder?: string;
  error?: string;
}
export const MultiSelectWithQuantity = ({
  options,
  value,
  onValueChange,
  placeholder,
  error,
}: MultiSelectWithQuantityProps) => {
  // local search input
  const [filterText, setFilterText] = useState("");

  // map selected by itemId
  const selectedMap = useMemo(() => {
    return value.reduce<Record<string, SelectedItem>>((map, item) => {
      map[item.itemId] = item;
      return map;
    }, {});
  }, [value]);

  // filter list
  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      // Only include items with quantity > 0
      if (option.quantity <= 0) return false;

      // If there's no filter text, include the option
      if (!filterText) return true;

      // Otherwise, filter by name
      return option.name.toLowerCase().includes(filterText.toLowerCase());
    });
  }, [options, filterText]);

  // toggle item selected/unselected
  // toggle item selected/unselected
  // toggle item selected/unselected
  const handleToggle = useCallback(
    (itemId: string) => {
      // string now
      if (selectedMap[itemId]) {
        onValueChange(value.filter((item) => item.itemId !== itemId));
      } else {
        onValueChange([...value, { itemId, quantity: 1 }]);
      }
    },
    [value, selectedMap, onValueChange]
  );

  // update quantity
  const handleQuantityChange = useCallback(
    (itemId: string, newValue: string) => {
      // find the inventory item by string ID
      const inventoryItem = options.find((i) => i.id === itemId);
      const maxQty = inventoryItem?.quantity ?? 0;

      // parse user input
      let parsed = parseInt(newValue, 10);

      // if parsing fails or value < 1, default to 1
      if (isNaN(parsed) || parsed < 1) parsed = 1;

      // clamp to available stock
      parsed = Math.min(parsed, maxQty);

      // update the selected items
      const updated = value.map((item) =>
        item.itemId === itemId ? { ...item, quantity: parsed } : item
      );

      onValueChange(updated);
    },
    [value, options, onValueChange]
  );

  return (
    <div className="space-y-3 p-4 border border-gray-200 rounded-xl bg-white overflow-y-auto">
      {/* Search Input */}
      <div className="relative mb-3">
        <Input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder={placeholder ?? "Search items"}
          className="pl-10"
        />
        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <p className="text-sm font-semibold text-gray-700 mb-2">
        Available Items:
      </p>

      {/* Options List */}
      <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => {
            const itemState = selectedMap[option.id];
            const isSelected = !!itemState;
            const qtyValue = isSelected ? itemState.quantity : "";

            return (
              <div
                key={option.id}
                className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                  isSelected
                    ? "bg-orange-50 border-orange-200"
                    : "bg-white hover:bg-gray-50 border-gray-100"
                }`}
              >
                {/* Checkbox */}
                <label className="flex items-center flex-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggle(option.id)}
                    className="h-4 w-4 accent-primary border-gray-300 rounded"
                  />
                  <span
                    className={`ml-3 text-sm flex-1 ${
                      isSelected ? "font-medium text-gray-800" : "text-gray-700"
                    }`}
                  >
                    {option.name}
                  </span>
                </label>

                {/* Quantity */}
                <div className="w-20 ml-2 flex items-center">
                  <Input
                    type="number"
                    value={qtyValue}
                    onChange={(e) =>
                      handleQuantityChange(option.id, e.target.value)
                    }
                    disabled={!isSelected}
                    placeholder="Qty"
                    className={`p-1 text-center text-sm ${
                      !isSelected ? "bg-gray-100" : "bg-white"
                    }`}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-sm text-gray-500 py-4">
            {`No items found matching \"${filterText}\".`}
          </p>
        )}
      </div>

      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
};
