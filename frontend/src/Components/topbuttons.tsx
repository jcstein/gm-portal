import { IconButton, Flex, HStack } from "@chakra-ui/react";
import { FaMoon, FaSun, FaGithub, FaFaucet } from "react-icons/fa";
import { useColorMode } from "@chakra-ui/react";

export const Topbuttons = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex align="center" justify="end">
      <HStack pt="3" pr="5">
        <IconButton
          onClick={() => window.open("https://github.com/jcstein/gm-portal", "_blank")}
        aria-label={`Switch from ${colorMode} mode`}
        >
          {<FaGithub />}
        </IconButton>
        <IconButton
          onClick={() => window.open("https://bubstestnet.com", "_blank")}
        aria-label={`Switch from ${colorMode} mode`}
        >
          {<FaFaucet />}
        </IconButton>
        <IconButton
          onClick={toggleColorMode}
          aria-label={`Switch from ${colorMode} mode`}
        >
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </IconButton>
      </HStack>
    </Flex>
  );
};