import { allowedOrigines } from "./allowedOrigines.js";
export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigines.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
