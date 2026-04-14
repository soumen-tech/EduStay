import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxItem {
  value: string;
  label: string;
  group?: string; // Optional group for categorized items (like Office vs College)
}

interface LocationComboboxProps {
  items: ComboboxItem[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder?: string;
  loading?: boolean;
  onSearchChange?: (search: string) => void;
  disabled?: boolean;
  emptyText?: string;
  filterLocal?: boolean;
}

export function LocationCombobox({
  items,
  value,
  onValueChange,
  placeholder,
  searchPlaceholder = "Search...",
  loading = false,
  onSearchChange,
  disabled = false,
  emptyText = "No results found.",
  filterLocal = true,
}: LocationComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedItem = items.find((item) => item.value === value);

  // Group items if they have 'group' property
  const hasGroups = items.some((item) => item.group);
  
  const renderItems = () => {
    if (!hasGroups) {
      return items.map((item) => (
        <CommandItem
          key={item.value}
          value={item.value}
          onSelect={(currentValue) => {
            onValueChange(currentValue === value ? "" : currentValue);
            setOpen(false);
          }}
        >
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              value === item.value ? "opacity-100" : "opacity-0"
            )}
          />
          {item.label}
        </CommandItem>
      ));
    }

    // Grouping rendering
    const groups = items.reduce((acc, item) => {
      const g = item.group || "Others";
      if (!acc[g]) acc[g] = [];
      acc[g].push(item);
      return acc;
    }, {} as Record<string, ComboboxItem[]>);

    return Object.entries(groups).map(([groupName, groupItems]) => (
      <CommandGroup key={groupName} heading={groupName}>
        {groupItems.map((item) => (
          <CommandItem
            key={item.value}
            value={item.value}
            onSelect={(currentValue) => {
              onValueChange(currentValue === value ? "" : currentValue);
              setOpen(false);
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === item.value ? "opacity-100" : "opacity-0"
              )}
            />
            {item.label}
          </CommandItem>
        ))}
      </CommandGroup>
    ));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between h-10 px-3 py-2 text-sm font-normal bg-transparent border-input border"
        >
          {value ? selectedItem?.label || value : <span className="text-muted-foreground">{placeholder}</span>}
          {loading ? (
            <Loader2 className="ml-2 h-4 w-4 shrink-0 opacity-50 animate-spin" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command shouldFilter={filterLocal}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchTerm}
            onValueChange={(v) => {
              setSearchTerm(v);
              if (onSearchChange) onSearchChange(v);
            }}
          />
          <CommandList>
            {loading && items.length === 0 ? (
               <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
                 Searching...
               </div>
            ) : (
              <CommandEmpty>{emptyText}</CommandEmpty>
            )}
            {renderItems()}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
