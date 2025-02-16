"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { useState } from "react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Contact Us", href: "/contact", isAction: true },
  ];

  return (
    <Navbar
      className="mx-auto max-w-7xl px-6 lg:px-8"
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Logo Section */}
      <NavbarContent>
        <NavbarBrand className="flex lg:flex-1">
          <Link className="-m-1.5 p-1.5" href="/">
            <Image
              alt="Ekagrata Logo"
              height={40}
              src="/logo.png"
              width={96}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-x-12" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              className={`text-sm font-semibold leading-6 ${
                item.isAction
                  ? "text-rose-600 hover:text-rose-700"
                  : "text-gray-900 hover:text-gray-600"
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Mobile Menu Toggle */}
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Mobile Navigation Menu */}
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              className={`block w-full py-3 text-lg font-semibold ${
                item.isAction
                  ? "text-rose-600 hover:text-rose-700"
                  : "text-gray-900 hover:text-gray-600"
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
} 