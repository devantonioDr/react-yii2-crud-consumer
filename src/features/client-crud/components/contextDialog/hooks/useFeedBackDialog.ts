import { useState } from "react";

export const useFeedBackDialog = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [feedBackType, setFeedBackType] = useState<"positive" | "negative">("positive");
    const [message, setMessage] = useState<string>("");
  
  
    const setNegative = () => {
      setFeedBackType("negative");
    };
  
    const setPositive = () => {
      setFeedBackType("positive");
    };
  
    const handleOpen = (message: string, type: "positive" | "negative") => {
      setFeedBackType(type);
      setMessage(message);
      setOpen(true);
    };
  
    const handleClose = () => {
      setMessage("");
      setOpen(false);
    };
  
    return {
      handleOpen,
      handleClose,
      message,
      open,
      feedBackType
    };
  }