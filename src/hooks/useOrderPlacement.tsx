import { useAppContext } from "../context/AppContext";
import { OrderRequest, Trade } from "../types";
import { sendOrder } from "../utils/order";

export function useOrderPlacement() {
  const { dispatch } = useAppContext();

  const sendPlaceOrder = async (orderRequest: OrderRequest) => {
    try {
      const completedTrade = await sendOrder(orderRequest);

      if (completedTrade) {
        dispatch({ type: "ADD_TRADE", payload: completedTrade as Trade });
      }
    } catch (error) {
      console.error("Failed to place order:", error);
    } finally {
      dispatch({ type: "SET_SELECTED_ORDER", payload: null });
    }
  };

  return { sendPlaceOrder };
}
