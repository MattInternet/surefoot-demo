import { observer } from "mobx-react";
import { Fragment } from "react";
import { ScannedSku } from "../../data";
import {
  Card,
  CardContent,
  Typography,
  CardOverflow,
  Chip,
  IconButton,
  Box,
} from "@mui/joy";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { useSkuStore } from "../../hooks";

export interface ScannedSkuListItemProps {
  scannedSku: ScannedSku;
}

export const ScannedSkuListItem = observer((props: ScannedSkuListItemProps) => {
  const { scannedSku } = props;
  const { sku, quantity } = scannedSku;

  const skuStore = useSkuStore();

  return (
    <Card orientation="horizontal" size="lg">
      <CardContent>
        <Typography level="title-md">{sku.sku}</Typography>
        <Typography>{sku.description ?? "No Description Provided"}</Typography>
      </CardContent>
      <CardOverflow
        sx={{
          px: 0.2,
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          padding: 2,
          justifyContent: "center",
          fontSize: "xs",
          fontWeight: "xl",
          letterSpacing: "1px",
          textTransform: "uppercase",
          borderLeft: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography fontWeight="md" textColor="success.plainColor">
          Quantity
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            onClick={() =>
              skuStore.updateSkuQuantity(sku, Math.max(0, quantity - 1))
            }
          >
            <Remove />
          </IconButton>
          <Chip size="lg">{quantity}</Chip>
          <IconButton
            onClick={() => skuStore.updateSkuQuantity(sku, quantity + 1)}
          >
            <Add />
          </IconButton>
        </Box>
      </CardOverflow>
    </Card>
  );
});
