import { defineRule, configure } from "vee-validate";
import { required, email, min, max } from "@vee-validate/rules";

const alphaNumSpaces = (value) => /^[a-zA-Z0-9\s]+$/.test(value);

export default defineNuxtPlugin((nuxtApp) => {
  defineRule("required", required);
  defineRule("email", email);
  defineRule("min", min);
  defineRule("max", max);
  defineRule("alphaNumSpaces", alphaNumSpaces);

  configure({
    generateMessage: (ctx) => {
      const messages = {
        required: `The ${ctx.field} field is required`,
        email: `The ${ctx.field} field must be a valid email`,
        min: `The ${ctx.field} field is too short`,
        max: `The ${ctx.field} field is too long`,
        alphaNumSpaces: `The ${ctx.field} must contain only letters, numbers, and spaces.`,
      };

      const message = messages[ctx.rule.name]
        ? messages[ctx.rule.name]
        : `The field ${ctx.rule.name} is invalid`;

      return message;
    },
  });
});
