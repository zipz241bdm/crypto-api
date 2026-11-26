import { NotFoundState } from "../components/feedback/NotFoundState";
import { BackLink } from "../components/widgets/BackLink";

export function NotFoundPage() {
  return (
    <div className="flex flex-col gap-4">
      <BackLink />
      <NotFoundState
        title="Page not found"
        message="The page you are looking for does not exist."
      />
    </div>
  );
}
