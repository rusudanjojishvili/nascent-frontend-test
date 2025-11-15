import { Box, Grid, InputAdornment, Paper, Tabs } from "@mui/material";
import { CustomTextField } from "./ui/CustomTextField";
import { useEffect, useMemo, useState } from "react";
import { CustomButton } from "./ui/CustomButton";
import { OrderFormState } from "../types";
import { useAppContext } from "../context/AppContext";
import { CustomTab } from "./ui/CustomTab";
import { calcLimitNotional, formatSide } from "../utils/order";
import { CustomTextButton } from "./ui/CustomTextButton";
import { useMarketCalculator } from "../hooks/useMarketCalculator";
import { useOrderPlacement } from "../hooks/useOrderPlacement";
import { useOrderForm } from "../hooks/useOrderForm";
import OrderSideTabs from "./OrderForm/OrderSideTabs";
import OrderTypeSwitch from "./OrderForm/OrderTypeSwitch";
import OrderFields from "./OrderForm/OrderFields";

const OrderForm = () => {
  const { state } = useAppContext();
  const { order, setOrder, updateOrder } = useOrderForm({
    side: 0,
    type: "LIMIT",
    quantity: 0.000001,
    price: "",
  });

  const asset = state.currentAsset;
  const side = useMemo(() => formatSide(order.side), [order.side]);
  const price = useMemo(() => Number(order.price), [order.price]);
  const quantity = useMemo(() => Number(order.quantity), [order.quantity]);
  const { sendPlaceOrder } = useOrderPlacement();

  const activeBook =
    side === "BUY" ? state.orderBook?.asks ?? [] : state.orderBook?.bids ?? [];

  const marketNotional = useMarketCalculator(side, quantity, activeBook);

  const notional = useMemo(() => {
    return order.type === "LIMIT"
      ? calcLimitNotional(price, quantity)
      : marketNotional?.notional ?? 0;
  }, [order.type, price, quantity, marketNotional]);

  const isBtnDisabled = Object.values(order).some(
    (value) => value === "" || value === null || value === undefined
  );

  useEffect(() => {
    // let a trader switch from 'LIMIT' to 'MARKET'
    if (!state.selectedOrder) {
      setOrder((prev) => ({
        ...prev,
        price: order.type === "MARKET" ? marketNotional?.price ?? "" : "",
      }));
    }
  }, [order.type, marketNotional?.price]);

  useEffect(() => {
    // let a trader make a trade directly from the order book
    if (state.selectedOrder) {
      const { price, side } = state.selectedOrder;
      const customSide = side === "BUY" ? 0 : 1;
      // update everything except quantity - because the trader sends the desired quantity
      setOrder((prev) => ({
        ...prev,
        side: customSide,
        price,
        type: "LIMIT",
      }));
      sendPlaceOrder({
        side,
        quantity,
        price,
        type: "LIMIT",
        asset,
        notional: calcLimitNotional(price, quantity),
      });
    }
  }, [state.selectedOrder]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    updateOrder("side", newValue as 0 | 1);
  };

  const handleSendOrder = () => {
    const baseOrder = {
      ...order,
      side: side as "BUY" | "SELL",
      asset,
      notional,
      quantity,
    };

    const orderToSend =
      order.type === "MARKET"
        ? { ...baseOrder, price: undefined }
        : { ...baseOrder, price }; // keep price only for LIMIT

    sendPlaceOrder(orderToSend);
  };

  return (
    <Paper elevation={0} sx={{ width: "100%" }}>
      <OrderSideTabs value={order.side} onChange={handleTabChange} />
      <Grid container direction={"column"} sx={{ padding: "20px" }} spacing={2}>
        <OrderTypeSwitch type={order.type} updateOrder={updateOrder} />
        <OrderFields
          order={order}
          updateOrder={updateOrder}
          notional={notional}
          asset={asset}
        />
      </Grid>
      <Box sx={{ padding: "12px" }}>
        <CustomButton
          side={side}
          onClick={handleSendOrder}
          disabled={isBtnDisabled}
        >
          {order.side === 0 ? "Buy " : "Sell "} {asset}
        </CustomButton>
      </Box>
    </Paper>
  );
};

export default OrderForm;
