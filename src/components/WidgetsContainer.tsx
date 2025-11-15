import { Grid } from "@mui/material";
import OrderBook from "./Orderbook";
import CryptoSwap from "./CryptoSwap";
import OrderForm from "./OrderForm";

const WidgetsContainer = () => {
  return (
    <Grid container direction={"column"} spacing={1}>
      <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
        <CryptoSwap />
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <OrderBook />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <OrderForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WidgetsContainer;
