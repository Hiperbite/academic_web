import { z } from "zod";

export const numericString = (schema: z.ZodTypeAny) =>
    z.preprocess((a) => {

        if (typeof a === 'string') {
            return parseInt(a, 10);
        } else if (typeof a === 'number') {
            return a;
        } else {
            return undefined;
        }
    }, schema)

export const floatString = (schema: z.ZodTypeAny) =>
    z.preprocess((a) => {

        if (typeof a === 'string') {
            return parseFloat(a);
        } else if (typeof a === 'number') {
            return a;
        } else {
            return undefined;
        }
    }, schema)
