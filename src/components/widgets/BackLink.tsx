import { TextLink } from "../../design-system";
import { ROUTES } from "../../router/paths";

export function BackLink() {
  return (
    <TextLink to={ROUTES.home} tone="default">
      <span aria-hidden="true">← </span>
      Back to dashboard
    </TextLink>
  );
}
