import { observer } from "mobx-react";
import { Sku } from "../../data";
import {
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { useEffect, useState } from "react";

export interface NewSkuModalProps {
  sku?: Sku;
  onClose: () => void;
  onNewSku: (newSku: Sku) => void;
}

export const NewSkuModal = observer((props: NewSkuModalProps) => {
  const { sku, onClose, onNewSku } = props;

  const [newSku, setNewSku] = useState<Sku | undefined>(sku);

  useEffect(() => {
    setNewSku(sku);
  }, [sku]);

  return (
    <Modal
      aria-labelledby="Create new SKU"
      open={Boolean(newSku)}
      onClose={onClose}
    >
      <ModalDialog>
        <ModalClose variant="outlined" />

        <DialogTitle>Create new SKU</DialogTitle>
        <DialogContent>
          You scanned an unknown SKU (Close to ignore)
        </DialogContent>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (newSku) {
              onNewSku(newSku);
            }
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>SKU</FormLabel>
              <Input
                required
                value={newSku?.sku}
                onChange={(e) => {
                  setNewSku({ ...newSku, sku: e.target.value });
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                autoFocus
                required
                value={newSku?.description}
                onChange={(e) => {
                  setNewSku({
                    sku: newSku?.sku!,
                    description: e.target.value,
                  });
                }}
              />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
});
