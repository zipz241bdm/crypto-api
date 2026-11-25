import { BackLink } from "../components/widgets/BackLink";
import { NotFoundState, Stack } from "../design-system";

export function NotFoundPage() {
  return (
    <Stack gap="md">
      <BackLink />
      <NotFoundState
        title="Page not found"
        message="The page you are looking for does not exist."
      />
    </Stack>
  );
}
