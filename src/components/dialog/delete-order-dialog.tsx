import {
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Dialog } from "@mui/material";
import { useDialog } from "@/providers/dialog-provider";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export const DeleteOrderDialog = ({
  onSubmit,
  onClose,
}: {
  onSubmit: () => void;
  onClose?: () => void;
}) => {
  const { isDialogOpen, closeDialog } = useDialog();
  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => {
        closeDialog();
        onClose?.();
      }}
    >
      <DialogTitle variant="h5" sx={{ fontWeight: 600, color: "error.main" }}>
        Xóa đơn hàng
      </DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <IconButton>
            <DeleteOutlineOutlinedIcon
              sx={{
                color: "error.main",
                fontSize: 60,
                backgroundColor: "rgb(255, 241, 240)",
                borderRadius: 100,
              }}
            />
          </IconButton>
          <Typography variant="body1">
            Bạn có chắc chắn muốn xóa đơn hàng này không? <br /> Tất cả dữ liệu
            liên quan sẽ bị xóa vĩnh viễn. <br /> Cân nhắc kỹ lưỡng trước khi
            thực hiện.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onSubmit?.();
            closeDialog();
          }}
          variant="contained"
          color="error"
          size="medium"
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Xóa
          </Typography>
        </Button>
        <Button
          onClick={() => {
            closeDialog();
            onClose?.();
          }}
          variant="contained"
          color="primary"
          size="medium"
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Hủy
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
