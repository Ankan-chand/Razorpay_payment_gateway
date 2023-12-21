import {useState} from "react";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from "axios";

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState("");

  const handleDonate = async() => {
    // Implement donation logic here
    const {data:{key_id}} = await axios.get("http://localhost:4000/api/v1/getkey");

    const {data:{order}} = await axios.post("http://localhost:4000/api/v1/checkout",{amount});

    const options = {
        key: key_id, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Non-profit foundation",
        description: "Donation",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:4000/api/v1/paymentverification",
        prefill: {
            name: name,
            email: email,
            contact: contact
        },
        notes: {
            address: "Razorpay Corporate Office"
        },
        theme: {
            color: "#3399cc"
        }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <>
      <Box maxW="400px" mx="auto" mt={10} >
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Contact</FormLabel>
          <Input
            type="tel"
            value={contact}
            placeholder="Enter your mobile number"
            onChange={(e) => setContact(e.target.value)}
            required
            maxLength={10}
            />
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            placeholder="Enter the amount you want to donate"
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </FormControl>

        <Button mt={4} colorScheme="teal" onClick={handleDonate}>
          Donate
        </Button>
      </Box>
    </>
  );
}

export default Home;
