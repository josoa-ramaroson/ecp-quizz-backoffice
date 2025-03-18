"use client"

import { EButtonSize } from "@/enums";

export const BUTTON_SIZE_CLASSNAME: Record<EButtonSize, string> = {
    [EButtonSize.SMALL]: "px-2 py-1 text-sm",
    [EButtonSize.MEDIUM]: "px-4 py-2 text-base",
    [EButtonSize.LARGE]: "px-8 py-4 text-lg",
    [EButtonSize.EXTRA_LARGE]: "px-16 py-8 text-xl",
    [EButtonSize.DOUBLE_EXTRA_LARGE]: "px-32 py-16 text-2xl",
  };