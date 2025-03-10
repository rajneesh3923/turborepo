import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  HStack,
  SystemStyleObject,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  //   onOpen: () => void;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
  cancelBtnText: string;
  okBtnText: string;
  onCancelBtnClick: () => void;
  onOkBtnClick?: () => void;
  sx?: SystemStyleObject; 
}

export default function CustomModal({
  isOpen,
  //   onOpen,
  onClose,
  children,
  title,
  onCancelBtnClick,
  onOkBtnClick,
  cancelBtnText,
  okBtnText,
  sx,
}: ModalProps) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onCancelBtnClick();
          onClose();
        }}
        closeOnOverlayClick={false}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent 
           sx={sx}
        >
          <ModalHeader>{title}</ModalHeader>

          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <HStack justify="space-between" width="100%" >
            <Button size="sm" mr={3} onClick={onClose}>
              {cancelBtnText}
            </Button>
            {onOkBtnClick?
            <Button size="sm" variant="solid" onClick={onOkBtnClick}>
              {okBtnText}
            </Button>: null
            }
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
