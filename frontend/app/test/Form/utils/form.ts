import { createForm } from "remix-forms";
// For Remix, import it like this
import {
  Form as FrameworkForm,
  useActionData,
  useSubmit,
  useTransition as useNavigation,
} from "@remix-run/react";

const Form = createForm({ component: FrameworkForm, useNavigation, useSubmit, useActionData });

export { Form };
