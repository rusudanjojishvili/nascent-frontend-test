import { Asset } from "../types";
import { useAppContext } from "../context/AppContext";
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { CustomInput } from "./ui/CustomInput";

const CryptoSwap = () => {
  const { state, dispatch } = useAppContext();

  const handleChange = (e: SelectChangeEvent) => {
    const selectedAsset = e.target.value as Asset;
    dispatch({ type: "SET_ASSET", payload: selectedAsset });
  };

  return (
    <Grid container>
      <FormControl sx={{ width: "100%" }} variant="standard">
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={state.currentAsset}
          onChange={handleChange}
          input={<CustomInput />}
        >
          <MenuItem value={"BTC"}>BTC</MenuItem>
          <MenuItem value={"ETH"}>ETH</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default CryptoSwap;
