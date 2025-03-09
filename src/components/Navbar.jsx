import React from 'react';
import { SearchIcon, UserIcon, HeartIcon,ShoppingBagIcon } from "@heroicons/react/outline";
import {
    Navbar as MTNavbar, 
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
} from "@material-tailwind/react";

function MyNavbar() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) setOpenNav(false);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize); // Cleanup function
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {["Home", "Category", "Collections", "Shop", "Offers", "Gift Store"].map((item) => (
                <Typography as="li" key={item} variant="small" color="blue" className="p-1 font-normal">
                    <a href="#" className="flex items-center">
                        {item}
                    </a>
                </Typography>
            ))}
        </ul>
    );

    return (
        <div>
            <MTNavbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-900">
                    <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-medium">
                        GIVA
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className="flex items-center gap-x-1">
                            <IconButton variant="text">
                                <SearchIcon className="h-5 w-5" />
                            </IconButton>
                            <IconButton variant="text">
                                <UserIcon className="h-5 w-5" />
                            </IconButton>
                            
                            <IconButton variant="text">
                                <HeartIcon className="h-5 w-5" />
                            </IconButton>
                            <IconButton variant="text">
                                <ShoppingBagIcon className="h-5 w-5" />
                            </IconButton>

                            <Button variant="text" size="sm" className="hidden lg:inline-block">
                                Log In
                            </Button>
                            <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                                Sign In
                            </Button>
                        </div>
                        <IconButton variant="text" onClick={() => setOpenNav(!openNav)} className="lg:hidden">
                            {openNav ? 'X' : '☰'}
                        </IconButton>
                    </div>
                </div>
                <MobileNav open={openNav}>{navList}</MobileNav>
            </MTNavbar>
        </div>
    );
}

export default MyNavbar;
