const BOLD="\033[1m";
const GREEN = "\033[32m";
const RED = "\033[31m";
const YELLOW = "\033[33m";
const RESET = "\033[0m";

export const DEPRECATION_WARNING = `
 ⚠️  ${BOLD}${YELLOW}DEPRECATION WARNING${RESET} ⚠️ 
    Please use \`${BOLD}dynamicImport${GREEN}Handler${RESET}\` instead of \`${BOLD}dynamicImport${RED}Hanlder${RESET}\`
    Future versions of vite-plugin-dynamic-public-path will remove \`${BOLD}dynamicImport${RED}Hanlder${RESET}\`
`;
