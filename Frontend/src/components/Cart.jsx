import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("https://mama-s-kitchen.onrender.com/cart/getCartItems");
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCartItems(data.products || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <>
      <Flex justify="space-between" alignItems="center" p={4}>
        <Heading>Cart Items</Heading>
        <Badge colorScheme="teal" fontSize="lg">
          {cartItems.length} items
        </Badge>
      </Flex>
      <Box p={5} display="flex" justifyContent="center">
        <Box width={{ base: '100%', md: '80%', lg: '60%' }}>
          {loading ? (
            <SimpleGrid columns={1} spacing={4}>
              {[1, 2, 3, 4].map((index) => (
                <SkeletonCard key={index} />
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={1} spacing={4}>
              {cartItems.map((item) => (
                <Box
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                  display="flex"
                  flexDirection={{ base: 'column', sm: 'row' }}
                  bg="white"
                  p={4}
                  boxShadow="lg"
                  key={item.productId._id}
                >
                  <Image
                    objectFit="cover"
                    height={{ base: '150px', sm: '200px' }}
                    width={{ base: '100%', sm: '150px' }}
                    src={item.productId.imgUrl}
                    alt="Cart Item Image"
                  />
                  <Stack spacing={3} p={4} flex="1">
                    <Heading size="md" mb={2} noOfLines={1}>{item.productId.name}</Heading>
                    <Text py="2" noOfLines={2}>{item.productId.description}</Text>
                    <Text py="2">Quantity: {item.quantity}</Text>
                    <Button
                      variant="solid"
                      colorScheme="red"
                      size="sm"
                      width={{ base: 'full', sm: 'auto' }}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Box>
    </>
  );
};

const SkeletonCard = () => (
  <Box
    borderWidth="1px"
    borderRadius="md"
    overflow="hidden"
    display="flex"
    flexDirection={{ base: 'column', sm: 'row' }}
    bg="white"
    p={4}
    boxShadow="lg"
  >
    <Skeleton height={{ base: '150px', sm: '200px' }} width={{ base: '100%', sm: '150px' }} />
    <Stack spacing={3} p={4} flex="1">
      <Heading size="md">
        <Skeleton height="20px" width="70%" />
      </Heading>
      <Text py="2">
        <Skeleton height="15px" width="90%" />
      </Text>
      <Button variant="solid" colorScheme="teal" size="sm" width={{ base: 'full', sm: 'auto' }}>
        <Skeleton height="30px" width="100px" />
      </Button>
    </Stack>
  </Box>
);

export default Cart;
