import { EButtonVariant } from "@/enums";
import { TButtonVariantStyle } from "@/types";

export const BUTTON_VARIANT_CLASSNAME: TButtonVariantStyle  = {
    [EButtonVariant.PRIMARY]: {
        enabled: "bg-primary-600 text-white hover:bg-primary-800 shadow-md",
        disabled: "bg-primary-300 text-white cursor-not-allowed shadow-md",
      },
      [EButtonVariant.SECONDARY]: {
        enabled: "bg-secondary-600 text-white hover:bg-secondary-700 shadow-md",
        disabled: "bg-secondary-300 text-white cursor-not-allowed shadow-md",
      },
      [EButtonVariant.OUTLINE]: {
        enabled: "border border-secondary-300 bg-transparent hover:bg-secondary-50 text-secondary-700 focus:ring-secondary-500",
        disabled: "border border-secondary-200 bg-transparent text-secondary-400 cursor-not-allowed",
      },
      [EButtonVariant.GHOST]: {
        enabled: "bg-transparent hover:bg-secondary-100 text-secondary-700 hover:bg-accent hover:text-accent-foreground focus:ring-secondary-500",
        disabled: "bg-transparent text-secondary-400 cursor-not-allowed",
      },
      [EButtonVariant.LINK]: {
        enabled: "bg-transparent underline text-primary-600 hover:text-primary-800 p-0 focus:ring-primary-500",
        disabled: "bg-transparent underline text-primary-300 cursor-not-allowed p-0",
      },
      [EButtonVariant.DANGER]: {
        enabled: "bg-error-600 hover:bg-error-700 text-white focus:ring-error-500",
        disabled: "bg-error-300 text-white cursor-not-allowed",
      },
      [EButtonVariant.TERTIARY]: {
        enabled: "text-primary-600 hover:text-secondary-700",
        disabled: "text-primary-300 cursor-not-allowed",
      },
}