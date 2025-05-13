"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface Props {
  openModal: () => void;
}

const ModalHandler: React.FC<Props> = ({ openModal }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [hasHandled, setHasHandled] = useState(false);

  useEffect(() => {
    const reason = searchParams.get("reason");

    if (reason === "unauthorized" && !hasHandled) {
      toast.error("You must be signed in to access this page.");
      openModal();
      setHasHandled(true);

      // Optional: clean the URL to remove ?reason
      const cleanPath = pathname;
      router.replace(cleanPath);
    }
  }, [searchParams, pathname, router, hasHandled, openModal]);

  return null;
};

export default ModalHandler;
