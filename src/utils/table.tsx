import { ParsedOrderBook, RawOrderBook } from "../types";
import { Column } from "../types/table";

export const columns: Column[] = [
  {
    label: "Price",
    key: "price",
    align: "left",
    render: (val: number) => val.toFixed(2),
  },
  {
    label: "Quantity",
    key: "quantity",
    align: "right",
    render: (val: number) => val.toFixed(6),
  },
  {
    label: "Total",
    key: "total",
    align: "right",
    render: (val: number) => val.toFixed(4),
  },
];

export const parseOrderBook = (raw: RawOrderBook): ParsedOrderBook => ({
  bids: raw.bids.map(([price, qty]) => ({
    price: parseFloat(price),
    quantity: parseFloat(qty),
  })),
  asks: raw.asks.map(([price, qty]) => ({
    price: parseFloat(price),
    quantity: parseFloat(qty),
  })),
});
