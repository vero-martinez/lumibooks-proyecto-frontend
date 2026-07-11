/**
 * Fila de producto en el carrito de compras.
 * Renderiza vista mobile (flex) y desktop (table-cell) en un solo <tr>
 */
import { memo } from "react";
import { FaTrash } from "react-icons/fa";
import { BookCover } from "@/components/shared/BookCover";
import { QuantitySelector } from "@/components/shared/QuantitySelector";
import { IconButton } from "@/components/shared/IconButton";
import { formatPrice } from "@/lib/utils";

const MAX_QTY = 5;
const BORDER_CLASS = "border-b border-border/20 last:border-0";

interface CartItemRowProps {
    coverImageUrl: string;
    title: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
    onQuantityChange: (quantity: number) => void;
    onRemove: () => void;
}

export const CartItemRow = memo(function CartItemRow({
    coverImageUrl,
    title,
    unitPrice,
    quantity,
    subtotal,
    onQuantityChange,
    onRemove,
}: CartItemRowProps) {
    const cover = (className: string) => (
        <BookCover src={coverImageUrl} alt={title} className={className} />
    );

    const qtySelector = (scale: string) => (
        <QuantitySelector
            value={quantity}
            onChange={onQuantityChange}
            max={MAX_QTY}
            className={`${scale} text-secondary-foreground`}
        />
    );

    const trashButton = (
        <IconButton
            icon={FaTrash}
            label="Eliminar"
            size="sm"
            onClick={onRemove}
            className="hover:bg-destructive/10 hover:text-destructive"
        />
    );

    const subtotalLabel = formatPrice(subtotal);
    const unitPriceLabel = formatPrice(unitPrice);

    return (
        <tr
            aria-label={`${title} — ${subtotalLabel}`}
            className={`${BORDER_CLASS} transition-colors even:bg-card odd:bg-card/30`}
        >
            {/* Mobile / Tablet */}
            <td className="block lg:hidden p-4">
                <div className="flex gap-4">
                    {cover("w-[80px] h-[120px] shrink-0")}
                    <div className="flex flex-col justify-between gap-2 min-w-0 flex-1">
                        <p className="font-semibold text-sm line-clamp-2 mb-2">{title}</p>

                        <div className="flex items-center justify-between">
                            {qtySelector("scale-[0.9] origin-top-left")}
                            {trashButton}
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{unitPriceLabel}</span>
                            <span className="font-bold text-sm">{subtotalLabel}</span>
                        </div>
                    </div>
                </div>
            </td>

            {/* Desktop */}
            <td className="hidden lg:table-cell py-5 pl-6 pr-2 text-sm">
                <div className="flex items-center gap-6">
                    {cover("w-[65px] h-[97px]")}
                    <span className="font-semibold text-base line-clamp-2">{title}</span>
                </div>
            </td>
            <td className="hidden lg:table-cell py-5 px-6 text-center align-middle">
                {qtySelector("scale-[0.75] origin-center")}
            </td>
            <td className="hidden lg:table-cell py-5 px-6 text-base text-right text-secondary-foreground">
                {unitPriceLabel}
            </td>
            <td className="hidden lg:table-cell py-5 px-6 text-base text-right text-secondary-foreground">
                {subtotalLabel}
            </td>
            <td className="hidden lg:table-cell py-5 pl-3 pr-6">
                <div className="flex justify-center">
                    {trashButton}
                </div>
            </td>
        </tr>
    );
});