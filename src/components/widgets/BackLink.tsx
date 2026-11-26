import { Link } from "react-router";
import { ROUTES } from "../../router/paths";

export function BackLink() {
  return (
    <Link to={ROUTES.home} className="inline-flex w-fit items-center gap-1 hover:underline">
      <span aria-hidden="true">←</span>
      <span>Back to dashboard</span>
    </Link>
  );
}
