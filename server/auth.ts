import type { Request, Response, NextFunction } from "express";
import session from "express-session";

declare module "express" {
  interface Request {
    session: session.Session & Partial<session.SessionData> & { isAdmin?: boolean };
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.isAdmin) {
    return res.status(401).json({ message: "Unauthorized. Admin access required." });
  }
  next();
}

export function loginAdmin(req: Request, res: Response) {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  if (process.env.NODE_ENV === "production" && !process.env.ADMIN_PASSWORD) {
    console.error("CRITICAL: ADMIN_PASSWORD environment variable must be set in production!");
    return res.status(500).json({ success: false, message: "Server configuration error" });
  }

  if (password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    return res.json({ success: true, message: "Login successful" });
  }

  return res.status(401).json({ success: false, message: "Invalid password" });
}

export function logoutAdmin(req: Request, res: Response) {
  req.session.destroy((err: Error | null) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.json({ success: true, message: "Logout successful" });
  });
}

export function checkAdminStatus(req: Request, res: Response) {
  res.json({ isAdmin: !!req.session.isAdmin });
}
