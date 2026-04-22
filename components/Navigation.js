import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"

export default function Navigation() {
  const [session] = useSession()
  const router = useRouter()

  const path = router?.asPath || ""
  const email = session?.user?.email || ""

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link href="/" passHref>
        <Navbar.Brand style={{ cursor: "pointer" }}>Home</Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Link href="/browse/1" passHref>
            <a
              className={`nav-link ${path.includes("/browse") ? "active" : ""}`}
            >
              Browse
            </a>
          </Link>

          {session ? (
            <>
              {email === "codabool@pm.me" && (
                <Link href="/admin" passHref>
                  <a
                    className={`nav-link ${path === "/admin" ? "active" : ""}`}
                  >
                    Admin
                  </a>
                </Link>
              )}

              <Link href="/account" passHref>
                <a
                  className={`nav-link ${path.includes("/account") ? "active" : ""}`}
                >
                  Account
                </a>
              </Link>

              <Link href="/checkout/cart" passHref>
                <a
                  className={`nav-link ${path === "/checkout/cart" ? "active" : ""}`}
                >
                  Cart
                </a>
              </Link>

              <Link href="/auth/logout" passHref>
                <a
                  className={`nav-link ${path === "/auth/logout" ? "active" : ""}`}
                >
                  Logout
                </a>
              </Link>
            </>
          ) : (
            <Link href="/auth/login" passHref>
              <a
                className={`nav-link ${path === "/auth/login" ? "active" : ""}`}
              >
                Login
              </a>
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
