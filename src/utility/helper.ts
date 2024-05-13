import { NavItemProps } from "@neoWeb/components/SideBar/NavItem";

const categorizedNavlinks = (
  navlinks: NavItemProps[]
): {
  header: string;
  links: NavItemProps[];
}[] => {
  const categorizedNavlinks: Record<string, NavItemProps[]> = {};
  for (const field of navlinks ?? []) {
    const category = field?.header;
    if (!categorizedNavlinks[category]) {
      categorizedNavlinks[category] = [];
    }
    categorizedNavlinks[category]?.push(field);
  }

  const categorizedArray = Object.entries(categorizedNavlinks).map(
    ([header, fields]) => {
      return {
        header,
        links: fields
      };
    }
  );

  return categorizedArray;
};
export { categorizedNavlinks };
