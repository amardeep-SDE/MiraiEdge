import React from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  VStack,
  Link as ChakraLink,
  Tooltip,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaChartLine } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/", icon: FaTachometerAlt },
    { name: "Users", path: "/users", icon: FaUsers },
    { name: "Reports", path: "/reports", icon: FaChartLine },
  ];

  return (
    <>
      {isOpen && (
        <Box
          position="fixed"
          inset={0}
          bg="blackAlpha.500"
          zIndex={30}
          display={{ base: "block", lg: "none" }}
          onClick={toggle}
        />
      )}

      <Box
        position={{ base: "fixed", lg: "static" }}
        top="0"
        left="0"
        h="100vh"
        w="64"
        zIndex={40}
        transform={{
          base: isOpen ? "translateX(0)" : "translateX(-100%)",
          lg: "translateX(0)",
        }}
        transition="all 0.35s ease"
        bg="rgba(255, 255, 255, 0.08)"
        // _dark={{ bg: "rgba(15, 15, 20, 0.8)" }}
        backdropFilter="blur(18px)"
        borderRightWidth="1px"
        // borderColor="gray.700"
        _dark={{ borderRight: "1px solid", borderColor: "gray.700" }}
        boxShadow="xl"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Flex
          align="center"
          justify="space-between"
          p="4"
          borderBottomWidth="1px"
          // borderColor="gray.700"
          _dark={{ borderBottom: "1px solid", borderColor: "gray.700" }}
        >
          <Text
            fontSize="2xl"
            fontWeight="extrabold"
            bgGradient="linear(to-r, cyan.400, blue.400)"
            bgClip="text"
          >
            MiraiEdge
          </Text>
          <Box
            display={{ base: "block", lg: "none" }}
            cursor="pointer"
            onClick={toggle}
            color="gray.400"
            fontSize="lg"
          >
            ✕
          </Box>
        </Flex>

        <VStack align="stretch" spacing={2} p={4} flex="1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <ChakraLink
                as={Link}
                to={link.path}
                key={link.name}
                onClick={() => {
                  if (window.innerWidth < 1024) toggle();
                }}
                _hover={{
                  bgGradient: "linear(to-r, blue.500/10, purple.500/10)",
                  transform: "translateX(6px)",
                }}
                transition="all 0.25s ease"
                bgGradient={
                  isActive
                    ? "linear(to-r, blue.500/20, purple.500/10)"
                    : "transparent"
                }
                borderLeft={isActive ? "4px solid" : "4px solid transparent"}
                borderColor={isActive ? "blue.400" : "transparent"}
                rounded="md"
                px="4"
                py="3"
                fontWeight={isActive ? "bold" : "medium"}
                color={isActive ? "blue.500" : "gray.600"}
                display="flex"
                alignItems="center"
                gap="3"
              >
                {React.createElement(link.icon, { size: 20 })}
                <Text>{link.name}</Text>
              </ChakraLink>
            );
          })}
        </VStack>

        <Box as="hr" borderColor="gray.700" opacity={0.3} my={2} />

        <Box textAlign="center" py={3} fontSize="xs" color="gray.500">
          <Text>
            © 2025{" "}
            <Text as="span" fontWeight="semibold" color="blue.400">
              Amardeep
            </Text>
          </Text>
          <Text fontStyle="italic" fontSize="10px" opacity={0.7}>
            Built with ❤️ using React
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
