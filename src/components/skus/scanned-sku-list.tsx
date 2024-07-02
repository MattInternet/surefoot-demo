import { Box, Card, Grid } from "@mui/joy";
import { ScannedSku } from "../../data";

import { observer } from "mobx-react";
import { ScannedSkuListItem } from "./scanned-sku-list-litem";

export interface ScannedSkuListProps {
  scannedSkus: ScannedSku[];
}

export const ScannedSkuList = observer((props: ScannedSkuListProps) => {
  const { scannedSkus } = props;

  if (!scannedSkus?.length) {
    return (
      <Box
        component="section"
        sx={{
          display: "flex",
          padding: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card size="lg" sx={{ width: 320 }}>
          Scan a SKU to begin
        </Card>
      </Box>
    );
  }

  return (
    <Box component="section">
      <Grid container spacing={2} sx={{ p: 2, flexGrow: 1 }}>
        {scannedSkus.map((scannedSku) => {
          return (
            <Grid xs={12} sm={6} key={scannedSku.sku.sku}>
              <ScannedSkuListItem scannedSku={scannedSku} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
});
