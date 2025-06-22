import { useLocation, matchRoutes } from "react-router-dom";
import { useEffect } from "react";
import { routes } from "@/routes";

export default function TitleManager({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();

  useEffect(() => {
    const matches = matchRoutes(routes, location);
    if (!matches) {
      document.title = "Ứng dụng của tôi";
      return;
    }

    for (let i = matches.length - 1; i >= 0; i--) {
      const match = matches[i];
      const title = (match.route as any).title;
      if (title) {
        document.title = title;
        return;
      }
    }

    document.title = "Ứng dụng của tôi";
  }, [location]);

  return <>{children}</>;
}
