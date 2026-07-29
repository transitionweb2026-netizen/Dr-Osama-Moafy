import { NavItemForm } from "../NavItemForm";
import { createNavItem } from "../actions";

export const metadata = { title: "New navigation item" };

export default function NewNavItemPage() {
  return <NavItemForm action={createNavItem} />;
}
