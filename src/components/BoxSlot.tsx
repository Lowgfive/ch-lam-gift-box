import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";
import { Product } from "@/data/mockData";

interface BoxSlotProps {
  id: string;
  product?: Product;
  index: number;
  onRemove?: (index: number) => void;
}

const BoxSlot = ({ id, product, index, onRemove }: BoxSlotProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  if (!product) {
    return (
      <div className="box-slot">
        <span className="text-muted-foreground text-sm">{index + 1}</span>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="box-slot-filled relative group"
      {...attributes}
      {...listeners}
    >
      <div className="w-full h-full flex flex-col items-center justify-center p-2">
        <span className="text-2xl mb-1">🍬</span>
        <span className="text-xs text-center font-medium text-foreground line-clamp-2">
          {product.name}
        </span>
      </div>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(index);
          }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          aria-label="Remove item"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default BoxSlot;
