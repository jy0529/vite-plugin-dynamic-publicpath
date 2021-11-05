const BOLD="\x1B[1m";
const GREEN = "\x1B[32m";
const RED = "\x1B[31m";
const YELLOW = "\x1B[33m";
const RESET = "\x1B[0m";

export const DEPRECATION_WARNING = `
 ⚠️  ${BOLD}${YELLOW}DEPRECATION WARNING${RESET} ⚠️ 
    Please use \`${BOLD}dynamicImport${GREEN}Handler${RESET}\` instead of \`${BOLD}dynamicImport${RED}Hanlder${RESET}\`
    Future versions of vite-plugin-dynamic-public-path will remove \`${BOLD}dynamicImport${RED}Hanlder${RESET}\`
`;
