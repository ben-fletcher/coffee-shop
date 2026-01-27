import { Link } from "react-router"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { CoffeeIcon, HomeIcon, ShoppingBagIcon, ShoppingCartIcon } from "lucide-react"

export default function NavigationBar() {
    return (
        <NavigationMenu className="p-2 max-w-screen flex flex-row justify-between">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link to="/">
                            <HomeIcon className="size-4" />
                            Home
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link to="/beans">
                            <CoffeeIcon className="size-4" />
                            Beans
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link to="/accessories">
                            <ShoppingBagIcon className="size-4" />
                            Accessories
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>

            <NavigationMenuList className="ml-auto">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link to="/cart">
                            <ShoppingCartIcon className="size-4" />
                            Cart
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
