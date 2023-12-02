import { ReactNode, Children, isValidElement } from "react";

interface SwitchProps {
  children: ReactNode;
}

interface CaseProps {
  condition: boolean;
  children: ReactNode;
}

interface DefaultProps {
  children: ReactNode;
}

function Switch({ children }: SwitchProps): React.ReactElement | null {
  const caseChild = Children.toArray(children).find(
    (child: ReactNode) => isValidElement(child) && (child.type as any) === Case
  ) as React.ReactElement<CaseProps> | undefined;

  const defaultChild = Children.toArray(children).find(
    (child) => isValidElement(child) && (child.type as any) === Default
  ) as React.ReactElement<DefaultProps> | undefined;

  return caseChild?.props.condition ? caseChild : defaultChild || null;
}

function Case({ condition, children }: CaseProps): React.ReactElement | null {
  if (condition) {
    return children as React.ReactElement;
  }
  return null;
}

function Default({ children }: DefaultProps): React.ReactElement {
  return children as React.ReactElement;
}

export { Switch, Case, Default };
