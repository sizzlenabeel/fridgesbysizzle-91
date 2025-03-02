
import { useToast, toast } from "@/hooks/use-toast";

// Updated toast function with default duration of 3000ms
const enhancedToast = (props: Parameters<typeof toast>[0]) => {
  return toast({
    duration: 3000,
    ...props,
  });
};

export { useToast, enhancedToast as toast };
