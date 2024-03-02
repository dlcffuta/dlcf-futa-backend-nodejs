import { Router } from "express"; 

import userRoutes from "./user";

const router = Router();

// * Collective routes: Default (index.ts) route
router.use("/user", userRoutes);

export default router;