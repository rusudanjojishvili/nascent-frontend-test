import axios from 'axios';
import { Asset, RawOrderBook, ParsedOrderBook, OrderRequest, Trade } from '../types';
import { parseOrderBook } from '../utils/table';

// Fetch orderbook and parse prices/quantities to numbers
export const fetchOrderBook = async (asset: Asset): Promise<ParsedOrderBook> => {
    const response = await axios.get<RawOrderBook>(`/api/orderbook/${asset}`);
    return parseOrderBook(response.data);
};

// Place an order (buy/sell)
export const placeOrder = async (
    order: OrderRequest
): Promise<Trade> => {
    const response = await axios.post(`/api/trade`, order);
    return response.data;
};
