import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  useDisclosure,
  FormControl,
  FormLabel,
  Box,
  Image,
  SimpleGrid,
  Stack,
  Heading,
  Skeleton
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:8080/products/getProducts");
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setFoods(data.allProducts || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch("http://localhost:8080/cart/");
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setCartItems(data.products || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleAddNewFood = async () => {
    try {
      const res = await fetch("http://localhost:8080/products/postProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: foodName, description, imageUrl:image })
      });

      if (res.ok) {
        const newFood = await res.json();
        setFoods((prevFoods) => [...prevFoods, newFood]);
        onClose();
        setFoodName("");
        setDescription("");
        setImage("");
      } else {
        console.error("Failed to add new food");
        alert("Failed to add new food. Please try again.");
      }
    } catch (error) {
      console.error("Error adding new food:", error);
      alert("An error occurred while adding new food. Please try again.");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const res = await fetch("http://localhost:8080/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId })
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCartItems(updatedCart.products || []);
      } else {
        console.error("Failed to add to cart");
        alert("Failed to add to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred while adding to cart. Please try again.");
    }
  };

  return (
    <>
      <Flex justify="space-between" alignItems="center" p={5}>
        <Text fontSize="25px" fontWeight="500">
          Available Food
        </Text>
        <Button leftIcon={<FaPlus />} colorScheme="teal" variant="solid" onClick={onOpen}>
          Add Food
        </Button>
      </Flex>

      <SimpleGrid columns={[1, 2, 3]} spacing={4} p={5}>
        {loading
          ? [1, 2, 3, 4].map((index) => <SkeletonCard key={index} />)
          : foods.map((item) => (
            <Box
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              display="flex"
              flexDirection={{ base: 'column', sm: 'row' }}
              bg="white"
              p={4}
              boxShadow="lg"
              key={item._id}
            >
              <Image
                objectFit='cover'
                height={{ base: '150px', sm: '200px', md: '220px' }}
                width={{ base: '100%', sm: '150px', md: '220px' }}
                src={item.imgUrl}
                alt={item.name || 'Food Image'}
              />
              <Stack spacing={3} p={4} flex="1">
                <Heading size='md' mb={2} noOfLines={1}>{item.name}</Heading>
                <Text py='2' noOfLines={2}>{item.description}</Text>
                <Button variant='solid' colorScheme='teal' width="full" onClick={() => handleAddToCart(item._id)}>
                  Add to Cart
                </Button>
              </Stack>
            </Box>
          ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Food</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Food Name</FormLabel>
              <Input
                placeholder="Enter food name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter food description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleAddNewFood}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const SkeletonCard = () => (
  <Box
    borderWidth="1px"
    borderRadius="md"
    overflow="hidden"
    display="flex"
    maxW="100%"
    boxShadow="lg"
    bg="white"
    p={4}
  >
    <Image
      objectFit='cover'
      height={{ base: '150px', sm: '200px', md: '220px' }}
      width={{ base: '100%', sm: '150px', md: '220px' }}
    />
    <Stack p={4} flex="1">
      <Heading size='md' mb={2} noOfLines={1}>
        <Skeleton height="20px" />
      </Heading>
      <Text py='2'>
        <Skeleton height="15px" />
      </Text>
      <Button variant='solid' colorScheme='blue' width="full">
        <Skeleton height="30px" width="100px" />
      </Button>
    </Stack>
  </Box>
);

export default Home;
