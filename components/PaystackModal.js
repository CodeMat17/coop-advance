import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const PaystackModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button
        onClick={onOpen}
        w='full'
        rounded='full'
        // fontSize='lg'
        // fontWeight='light'
        bg='#00abe1'
        color='white'
        _hover={{ bg: "blue.600" }}>
        Repay Loan
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent mx='2'>
          <ModalHeader>Repay Loan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PaystackModal;
