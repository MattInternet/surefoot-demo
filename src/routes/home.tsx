import { useSkuStore } from "../hooks";
import { NewSkuModal, ScannedSkuList } from "../components/skus";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Sku } from "../data";

export const Home = observer(() => {
  const skuStore = useSkuStore();

  const [unknownSku, setUnknownSku] = useState<Sku | undefined>(undefined);

  useEffect(() => {
    setUnknownSku(
      skuStore.unknownSku
        ? { sku: skuStore.unknownSku, description: "" }
        : undefined
    );
  }, [skuStore.unknownSku]);

  return (
    <>
      <NewSkuModal
        sku={unknownSku}
        onClose={() => skuStore.unknownSku = undefined}
        onNewSku={(newSku) => {
          skuStore.addNewSku(newSku);
          setUnknownSku(undefined);
        }}
      />

      <ScannedSkuList scannedSkus={skuStore.scannedSkus} />
    </>
  );
});
