import { Box, Button, ThemingProps } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
  cancelBtnText?: string;
  okBtnText?: string;
  onCancelBtnClick: () => void;
  onOkBtnClick: () => void;
  size: ThemingProps<"Drawer">["size"];
  bgColor?: string;
}

export default function CustomDrawer({
  cancelBtnText,
  isOpen,
  okBtnText,
  onCancelBtnClick,
  onClose,
  onOkBtnClick,
  title,
  children,
  size,
  bgColor,
}: DrawerProps) {
  const handleClose = () => {
    onCancelBtnClick();
    onClose();
  };

  return (
    <Box>
      <Drawer size={size} isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={handleClose}>
              {cancelBtnText ?? "Cancel"}
            </Button>
            <Button onClick={onOkBtnClick} variant="solid">
              {okBtnText ?? "Ok"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
