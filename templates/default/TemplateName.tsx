import { FC } from "react";
import styles from "./TemplateName.module.css";

interface TemplateNameProps {}

export const TemplateName: FC<TemplateNameProps> = () => {
  return <div className={styles.templateName}>TemplateName Component</div>;
};
