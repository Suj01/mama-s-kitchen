import { Flex, Text } from "@chakra-ui/react";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
const navigate = useNavigate();
    const handleCart=()=>{
navigate("/cart");
    }
    const handleHome=()=>{
        navigate("/");
    }
    return (
        <>
            <Flex justifyContent={"space-between"} alignItems={"center"} p={[2, 4]} boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
            >
                <Text fontSize={["lg", "xl", "2xl"]} onClick={handleHome}>
                    <span style={{ fontWeight: 'bold', fontSize: '30px' }}>M</span>ama&rsquo;s{' '}
                    <span style={{ fontWeight: 'bold', fontSize: '30px' }}>K</span>itchen
                </Text>

                <RiShoppingBag3Fill style={{ height: "auto", width: "50px" }} onClick={handleCart}/>
            </Flex>
        </>
    );
};

export default Navbar;
