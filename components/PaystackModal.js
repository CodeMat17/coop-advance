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
import {usePaystackPayment} from 'react-paystack'

const PaystackModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

// const config = {
//   reference: new Date().getTime().toString(),
//   email,
//   amount: amount * 100,
//   publicKey: "pk_test_01fc1183b5664f5c293f2f729aa4c876f0bfffd6",
//   metadata: {
//     email,
//     amount: amount * 100,
//     images: JSON.stringify(items.map((item) => item.name)),
//   },
//   };
  
  const onSuccess = (reference) => {
    console.log("reference", reference);
    // router.push("/order-received");
  };

  // const onClose = () => {
  //   console.log("Payment Closed");
  //   alert("Opps, Payment not completed. Please try again");
  // };

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
