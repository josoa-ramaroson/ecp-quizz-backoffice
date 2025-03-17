"use client"
import { EErrorMessage } from "@/enums";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { uniqueNamesGenerator, adjectives, animals, colors } from 'unique-names-generator';
export function useGeneratePseudo() {
    const generatePseudo = useCallback( () => {
        try {
            const randomName = uniqueNamesGenerator({
                dictionaries: [colors, adjectives, animals], // Generates names like "SillyPenguin"
                length: 2,                          // You can adjust the number of parts in the name
                separator: '',                      // No separator, just combine words (can use '-' for hyphenated names)
                style: 'capital',                   // Capitalizes the first letter of each part
              });
              return randomName;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message :EErrorMessage.UNAUTHORIZED_ERROR;
            toast.error(errorMessage);
            return "";
        }
    }, []);


    return {
        generatePseudo
    }
}